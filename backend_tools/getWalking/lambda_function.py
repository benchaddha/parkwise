import json
import requests
import urllib.parse
import time
import math
import os

def lambda_handler(event, context):
    
    # make env variable

    apiKey = os.environ['apiKey']
    if "body" not in event:
        raise Exception("event has no body")
    
    body = json.loads(event["body"])
    
    # parse event
    if "userFilters" not in body:
        raise Exception("no userFilters")
    elif "meters" not in body:
        raise Exception("no meters provided")
    
    userFilters = body["userFilters"]
    meters = body["meters"]
    
    origin_longitude = str(userFilters["longitude"])
    origin_latitude = str(userFilters["latitude"])
    origin = f'{origin_latitude},{origin_longitude}'
    
    num_meters = len(meters)
    queried = 0
    addresses = []
    matrix = []
    
    while(queried < num_meters):
        destinations = ''
        for i in range(queried, queried+25):
            if i == num_meters - 1:
                curr_destination = f'{meters[i]["latitude"]},{meters[i]["longitude"]}'
                destinations+=curr_destination
                break;
            else:
                curr_destination = f'{meters[i]["latitude"]},{meters[i]["longitude"]}'
                destinations+=curr_destination
                destinations+="|"
        
        url = 'https://maps.googleapis.com/maps/api/distancematrix/json'

        # Parameters for the GET request
        params = {
            'origins': origin,
            'destinations': destinations,
            'key': apiKey,
            'mode': 'walking'
        }
        
        # Make the GET request
        response = requests.get(url, params=params)
        
        if response.status_code != 200:
            return {
                'statusCode' : response.status_code,
                'headers' : 
                    {
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                'body' : json.dumps(response.json())
            }
        
        addresses = addresses + response.json()["destination_addresses"]
        matrix = matrix + response.json()["rows"][0]["elements"]
        queried += len(response.json()["rows"][0]["elements"])
        
    time = userFilters["max_distance"]
    filtered_meters = []
    
    for i, entry in enumerate(matrix):
        curr_minutes = entry["duration"]["value"]/60
        if curr_minutes > time:
            continue
        else:
            filtered_meters.append({
                "latitude": meters[i]["latitude"],
                "longitude": meters[i]["longitude"],
                "price": meters[i]["price"],
                "currentSpots": meters[i]["currentSpots"],
                "maxAvailableSpots": meters[i]["maxAvailableSpots"],
                "walkingTime": curr_minutes,
                "address": addresses[i],
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
