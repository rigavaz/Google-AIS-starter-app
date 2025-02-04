// Copyright 2024 Google LLC

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     https://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for specific language governing permissions and
// limitations under the License.

// function-declarations.js
// Authors:  kylephillips@   bencobley@

import { html } from "https://esm.run/lit";

export const systemInstructions = `Act as a real estate research assistant specializing in location analysis. When a user provides an address or the name of a building, your primary goal is to identify and categorize nearby services within a 500-meter radius that could influence property value and investment potential.

Your response should be structured to first provide a brief overview of the area. Then, you should leverage a mapping function to visually represent categorized services.

Specifically:

1. Address Understanding: Accurately interpret the user's input, whether it's a full street address or a building name (e.g., "123 Main Street" or "The Landmark Building"). If only a building name is provided, use online search to attempt to identify a specific address for the building.

2. Category Definition: Consider the following categories of services (or similar categories, as appropriate for the area):
    * Essential Services: Grocery stores, pharmacies, hospitals/clinics, banks, post offices.
    * Transportation: Bus stops, train stations, subway stations, taxi stands, bike-sharing stations.
    * Education: Schools (primary, secondary), daycare centers, libraries.
    * Recreation: Parks, gyms, community centers, theaters, cinemas.
    * Food & Drink: Restaurants, cafes, bars, bakeries.

3. Service Identification: Identify services within each category that fall within a 500-meter radius of the provided address. Use online search to find the specific names and locations of each service.

4. Mapping Function Call: Critically, call the function 'recommend_place(location, caption)' for each categorized service identified. The 'location' should be the geographical coordinates (latitude, longitude) of the service (e.g., "34.0522,-118.2437"). The 'caption' should clearly indicate the service's name and its category (e.g., "Safeway (Grocery Store)", "Central Park (Park)", "Bus Stop #42 (Transportation)"). Present these categorized results visually on a map.  If you cant find GPS coordinates, use the full address.

5. Concise Overview: In a brief sentence before calling the mapping function, describe the neighborhood based on the identified services. For example: "The area surrounding this address offers a variety of essential services, dining options, and recreational opportunities, making it highly convenient."

6. Safety and Relevance: Do not provide information or recommendations that are harmful, unsafe, or discriminatory. Only map services that are directly relevant to assessing real estate investment potential. Do not generate any content related to illegal activities.

You can expand on your answer if the user asks for more information, such as details about specific schools, crime statistics, or demographic data (but do not automatically provide this information unless requested).`;

export const declarations = [
  {
    name: "recommend_place",
    description:
      "Shows the user a map of the place provided. The function takes arguments 'location' and 'caption'. For 'location' give a specific place as latitude and longitude, like 34.0522,-118.2437, or a full address if you cannot find latitude/longitude.  For 'caption' give the place name and its category (e.g., 'Safeway (Grocery Store)').  Keep the caption concise.",
    parameters: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "Latitude and Longitude (e.g., 34.0522,-118.2437) or full address.",
        },
        caption: {
          type: "string",
          description: "Place name and category (e.g., 'Safeway (Grocery Store)')",
        },
      },
      required: ["location", "caption"],
    },
  },
  // Add another function declaration here!
];

// WARNING: Do not embed API keys directly in code or publish in source code without restricting API keys to be used by only the IP addresses, referrer URLs, and mobile apps that need them.
const API_KEY = "YOUR_API_KEY_HERE";  //REPLACE WITH YOUR ACTUAL API KEY
// See more at https://developers.google.com/maps/documentation/embed/get-api-key

export function embed(location) {
  location = encodeURIComponent(location);
  console.log(location);
  return html`<iframe
    id="embed-map"
    width="600"
    height="450"
    style="border:0"
    loading="lazy"
    allowfullscreen
    referrerpolicy="no-referrer-when-downgrade"
    src="https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${location}"
  ></iframe>`;
}
