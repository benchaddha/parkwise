import json
import requests
import urllib.parse
import time
import math

def lambda_handler(event, context):
    
    if "body" not in event:
        raise Exception("event has no body")
    
    body = json.loads(event["body"])
    
    # parse event
    if "meters" not in body:
        raise Exception("no meters provided")
    
    meters = body["meters"]
    
    # limit 10 sorted on distance
    sorted_meters = sorted(meters, key=lambda x: x['walkingTime'])[:10]
    
    preds = []
    
    for meter in sorted_meters: 
        longitude = meter["longitude"]
        latitude = meter["latitude"]
        id = meter["id"]
        
        cookies = {
            'XSRF-TOKEN': 'eyJpdiI6InE4NzFBdWlMNTFWeXNUa2hHRnE4WkE9PSIsInZhbHVlIjoic3dSeGg2WFdrQzZFZndsNjg0OE82YmNRRVV1MWl2MGNsd1dncVlnRUtzdUxBczRYMThEVnY5WUlNVzBaK3J0dXRnV1dBRElHZWhrVWtVeVRjdTJNTjREdFlUZTc5aUNHWnRiY2JuWm53ZnBPbVA4MVNRaG5keTZXRzlYbUtDa3IiLCJtYWMiOiI2ZGNlOTY5MTk2N2IyZTk4OWYyNTgzOTI3YzczMWJkMmQyYjZmMzVkMWUxOGVlN2M0NzQxZTgyMjkyMjg1NmJjIn0%3D',
            'laravel_session': 'eyJpdiI6ImdYTmNybWF5NmFaQ0ZNemV1MUJ3M3c9PSIsInZhbHVlIjoiVnFwb1VzSkZWWi8vZUJqaEFQek5VZ2dQbDhDYUM0b0Q2UkN1MStGTWtzakRNNm9aVjc1Y0ZldDVuUmtuU2lhMnk0V1l1SlNTckNHYnkwcTB1am5pWUZocEJZQjcramlXR1kyR3RqQXo3WkVIU3ROUDJGeXE4TnRhYlBJdVVTeFQiLCJtYWMiOiIyNmVjMjUyNmRjMjQ2YzYzMGUzZWExNzEwZGJlZjNmYTk5YzViYjg1ODNmYjMxM2JjNWJhYWUzY2ZjMDM3MTZmIn0%3D',
        }

        headers = {
            'accept': 'text/html, application/xhtml+xml',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json;charset=utf-8',
            'referer': f'https://map.chicagometers.com/terminal/802903/loc/16/{latitude}/{longitude}',
            'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
            'x-inertia': 'true',
            'x-inertia-partial-component': 'Home',
            'x-inertia-partial-data': 'terminal,terminalHours,zoom,center',
            'x-requested-with': 'XMLHttpRequest',
            'x-xsrf-token': 'eyJpdiI6InE4NzFBdWlMNTFWeXNUa2hHRnE4WkE9PSIsInZhbHVlIjoic3dSeGg2WFdrQzZFZndsNjg0OE82YmNRRVV1MWl2MGNsd1dncVlnRUtzdUxBczRYMThEVnY5WUlNVzBaK3J0dXRnV1dBRElHZWhrVWtVeVRjdTJNTjREdFlUZTc5aUNHWnRiY2JuWm53ZnBPbVA4MVNRaG5keTZXRzlYbUtDa3IiLCJtYWMiOiI2ZGNlOTY5MTk2N2IyZTk4OWYyNTgzOTI3YzczMWJkMmQyYjZmMzVkMWUxOGVlN2M0NzQxZTgyMjkyMjg1NmJjIn0=',
        }
        
        response = requests.get(
        f'https://map.chicagometers.com/terminal/{id}/loc/16/{latitude}/{longitude}',
            cookies=cookies,
            headers=headers,
        )
        
        if response.status_code != 200:
            return {
                "statusCode" : response.status_code,
                'headers' : 
                    {
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                "body" : json.dumps(response.json())
            }
            
        preds.append(response.json()["props"]["terminalHours"][:3])
        
    

    # if possible,
    # give 2 closest, 1 with current availability, and 2 with highest probability of having a space
    
    filtered_meters = []
    
    for i, pred in enumerate(preds):
        max_spaces = meters[i]["maxAvailableSpots"]
        curr_spaces = meters[i]["currentSpots"]
        
        # handling negatives
        if max_spaces < 0:
            max_spaces = 0
        if curr_spaces < 0:
            curr_spaces = max_spaces
        
        # predictions
        curr_predictions = []
        for hour in pred:
            curr_predictions.append({
                'spaces' : hour["availability"],
                'probability' : float(hour["blockPrediction"])/max_spaces            
            })
            
        filtered_meters.append({
            "latitude": meters[i]["latitude"],
            "longitude": meters[i]["longitude"],
            "price": meters[i]["price"],
            "currentSpots": curr_spaces,
            "maxAvailableSpots": max_spaces,
            "walkingTime": meters[i]["walkingTime"],
            "address": meters[i]["address"],
            "predictions" : curr_predictions,
            "id" : meters[i]["id"]
        })
    
    
    return {
        'statusCode': 200,
        'headers' : 
            {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
        'body': json.dumps({"data" : filtered_meters})
    }
