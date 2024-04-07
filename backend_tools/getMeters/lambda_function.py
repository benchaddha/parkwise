import json
import requests
import urllib.parse
import time
import math

def lambda_handler(event, context):
    
    # parse event
    expect = ["longitude", "latitude", "max_distance", "parking_time", "budget"]
    if "body" not in event:
        raise Exception("event has no body")
    
    
    
    body = json.loads(event["body"])
    userFilters = {}
    
    for param in expect:
        if param not in body:
            raise Exception(f"event a body but no {param}")
        else:
            userFilters[param] = body[param]
    
    
    # create bounding box
    
    bbplusminus = float(userFilters["max_distance"]) * 80.4671666667 * 0.000009 
    #approx meters per minute guess and 0.000009 is approx latitude and longitude distance variance then add an overestimation factor

    boundingBox = f'[{float(userFilters["latitude"])-bbplusminus},{float(userFilters["longitude"])-bbplusminus},{float(userFilters["latitude"])+bbplusminus},{float(userFilters["longitude"])+bbplusminus}]'
    
    # unix timestamp
    timestamp = int(time.time())
    
    
    cookies = {
    'XSRF-TOKEN': 'eyJpdiI6IktLcGdQRE1wSlhNY0JLTUtEaFYxcWc9PSIsInZhbHVlIjoienM1cXo4V0x6a2hEdy8zdFRST002amxpWjFhWlA0alhRcGgrQUtaU2NxbG9ZZ0R4VDQzSzhTM3BEeTNyYTVWSi9tZVhCSTZnNnlIZnhPalNML2wyMGFGTS9sWVI2T2wrbkZrMkloYnNEMmJEemx0OENaWGdIVEZHMEwyZTlWTFoiLCJtYWMiOiIyZTU0ZTQzZjk5MzNlOTgxODgyOTg0MWU2MDg2ODFkYjhhYjMzMzlkMDgwNTNhNTk3MzEwN2M2YjA3Y2IzYmFkIn0%3D',
    'laravel_session': 'eyJpdiI6IjdweDlMSjRyNU1KRXF3b0loaVRUU0E9PSIsInZhbHVlIjoiSm50ZU9ialRHcjZ3NitxeGxudWdqUlgwNFFSd3R5aEV1OUJBQjZuN3pzQjUxc1l5SW1zcERKZmpXaXVsajVVRkFHa09NOU11dmRwOUJlYnNKWU1NZVhXRy9WWG9ZYzVDMzdRZTREcTBmM2x1N0V4N0Y5MDd6Zjd4a2Y3cFdCMEYiLCJtYWMiOiI2MjFmMmMyMTUzYWM4NWMxZWRmNzhmYTg1OTQzYmY0Y2Y1MDU1YWQ5OGViYWM3ODEzMjdkNGJmMzA2YzhkMTYzIn0%3D',
    }
    
    headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json;charset=UTF-8',
        # 'cookie': 'XSRF-TOKEN=eyJpdiI6IktLcGdQRE1wSlhNY0JLTUtEaFYxcWc9PSIsInZhbHVlIjoienM1cXo4V0x6a2hEdy8zdFRST002amxpWjFhWlA0alhRcGgrQUtaU2NxbG9ZZ0R4VDQzSzhTM3BEeTNyYTVWSi9tZVhCSTZnNnlIZnhPalNML2wyMGFGTS9sWVI2T2wrbkZrMkloYnNEMmJEemx0OENaWGdIVEZHMEwyZTlWTFoiLCJtYWMiOiIyZTU0ZTQzZjk5MzNlOTgxODgyOTg0MWU2MDg2ODFkYjhhYjMzMzlkMDgwNTNhNTk3MzEwN2M2YjA3Y2IzYmFkIn0%3D; laravel_session=eyJpdiI6IjdweDlMSjRyNU1KRXF3b0loaVRUU0E9PSIsInZhbHVlIjoiSm50ZU9ialRHcjZ3NitxeGxudWdqUlgwNFFSd3R5aEV1OUJBQjZuN3pzQjUxc1l5SW1zcERKZmpXaXVsajVVRkFHa09NOU11dmRwOUJlYnNKWU1NZVhXRy9WWG9ZYzVDMzdRZTREcTBmM2x1N0V4N0Y5MDd6Zjd4a2Y3cFdCMEYiLCJtYWMiOiI2MjFmMmMyMTUzYWM4NWMxZWRmNzhmYTg1OTQzYmY0Y2Y1MDU1YWQ5OGViYWM3ODEzMjdkNGJmMzA2YzhkMTYzIn0%3D',
        'origin': 'https://map.chicagometers.com',
        'referer': f'https://map.chicagometers.com/loc/16/{userFilters["latitude"]}/{userFilters["longitude"]}',
        'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'x-xsrf-token': 'eyJpdiI6IktLcGdQRE1wSlhNY0JLTUtEaFYxcWc9PSIsInZhbHVlIjoienM1cXo4V0x6a2hEdy8zdFRST002amxpWjFhWlA0alhRcGgrQUtaU2NxbG9ZZ0R4VDQzSzhTM3BEeTNyYTVWSi9tZVhCSTZnNnlIZnhPalNML2wyMGFGTS9sWVI2T2wrbkZrMkloYnNEMmJEemx0OENaWGdIVEZHMEwyZTlWTFoiLCJtYWMiOiIyZTU0ZTQzZjk5MzNlOTgxODgyOTg0MWU2MDg2ODFkYjhhYjMzMzlkMDgwNTNhNTk3MzEwN2M2YjA3Y2IzYmFkIn0=',
    }
    
    json_data = {
        'boundingBox': boundingBox,
        'requestHour': timestamp,
    }
    
    
    response = requests.post('https://map.chicagometers.com/terminals', cookies=cookies, headers=headers, json=json_data)
    
    if response.status_code != 200 :
        return {
            'statusCode': response.status_code,
            'headers' : 
            {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            'body': json.dumps(response.json())
        }
        
    filtered_meters = []
    
    max_price = userFilters["budget"]
    max_hours = userFilters["parking_time"]
    
    hits = response.json()["terminals"]["hits"]
    
    for hit in hits:
        meter = hit
        price = float(meter["FullRate"])
        hours = float(meter["POS"])
        if not (math.isnan(hours) or math.isnan(price)):
            if hours>=max_hours and price <= max_price:
                filtered_meters.append({
                    "latitude" : float(meter["Latitude"]),
                    "longitude" : float(meter["Longitude"]),
                    "price": price, 
                    "currentSpots" : int(meter["Availability"]), 
                    "maxAvailableSpots" : int(meter["NumberOfSpaces"]),
                    "id" : int(meter["TerminalID"])
                })
        
    
    return {
        'statusCode': response.status_code,
        'headers' : 
            {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
        'body': json.dumps({"data" : filtered_meters})
    }
