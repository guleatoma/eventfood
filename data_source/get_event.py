import requests
import json
import pandas as pd
import sys
import os

def response():
    response = requests.get(
        "https://www.eventbriteapi.com/v3/events/search/?expand=organizer,venue",
        headers = {
            "Authorization": "Bearer <Mytoken>",#replace with actual token
        },
        params ={
           "location.address": "San Francisco", 
            "start_date.range_start": "2017-03-02T19:00:00",
            "start_date.range_end": "2017-03-17T19:00:00" 
            #only 2 weeks in the future but we can expand this
        },
        verify = True,  # Verify SSL certificate
    )
    return response

all=response()
responses=json.loads(all.text)
n=len(responses['events'])

for i in range(0,n):
    ev = responses['events'][i]
    id = ev['venue']['id']
    names = ev['name']
    address = ev['venue']['address']['localized_address_display']
    lat = ev['venue']['address']['latitude']
    long = ev['venue']['address']['longitude']
    capacity = ev['capacity']
    start = ev['start']
    end = ev['end']


data = pd.DataFrame({"id": id,
                     "name": names,
                     "address": address,
                     "latitude": lat,
                     "longitude": long,
                     "capacity": capacity,
                     "start": start,
                     "end": end})

json_data = data.to_json(orient='records')

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__))))
with open('eventbrite_data.json', 'w') as outfile:
    json.dump(json_data, outfile)


