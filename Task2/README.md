Object Data Model for a Nudge
==============================
type: "nudge"
event_id: The unique ID of the event tagged for the nudge.
title: The title of the nudge (max 60 characters).
cover_image: Image file to be displayed as the cover of the nudge (File upload).
schedule: The date and time for the nudge (in dd/mm/yy and hh:mm format).
description: A description of the nudge.
invitation_text: A one-line invitation message for the nudge, which will be displayed when minimized.
icon: Icon file to be displayed with the invitation message (File upload).
status: Status of the nudge (e.g., "published", "draft").


API Documentation
=================
Base URL: /api/v3/app/nudges
Endpoints:->
1.Create a New Nudge
====================
Request Type: POST
Endpoint: /api/v3/app/nudges
Payload:
event_id: String (ID of the event tagged in the nudge).
title: String (max 60 characters).
cover_image: File (image for the nudge cover).
schedule: Object containing:
date: String (in dd/mm/yy format).
from_time: String (in hh:mm format).
to_time: String (in hh:mm format).
description: String.
invitation_text: String (one-line message for minimized view).
icon: File (icon image).
status: String (published or draft).
Description: Creates a new nudge and returns the ID of the created nudge.


2.Get a Nudge by ID
Request Type: GET
Endpoint: /api/v3/app/nudges/:id
Description: Retrieves a specific nudge based on its unique ID.


3.Get All Nudges for an Event
Request Type: GET
Endpoint: /api/v3/app/nudges?event_id=<event_id>&limit=5&page=1
Parameters:
event_id: ID of the event to fetch nudges for.
limit: Number of nudges per page (default 5).
page: Page number for pagination (default 1).
Description: Fetches all nudges for a specific event, with pagination options.


4.Update a Nudge
Request Type: PUT
Endpoint: /api/v3/app/nudges/:id
Payload: Same as the POST payload, but only include fields that need updating.
Description: Updates an existing nudge by its unique ID.


5.Delete a Nudge
Request Type: DELETE
Endpoint: /api/v3/app/nudges/:id
Description: Deletes a nudge based on its unique ID.
============================================================

Example Payloads for CRUD Operations
POST /api/v3/app/nudges - Create a New Nudge
{
  "event_id": "example_event_id",
  "title": "Upcoming Workshop",
  "cover_image": "<file>",
  "schedule": {
    "date": "20/11/24",
    "from_time": "10:00",
    "to_time": "12:00"
  },
  "description": "Join us for an insightful workshop on innovation.",
  "invitation_text": "Check out this exciting workshop!",
  "icon": "<file>",
  "status": "published"
}

===============
GET /api/v3/app/nudges/
- Retrieve a Nudge by ID
{
  "_id": "nudge_id",
  "event_id": "example_event_id",
  "title": "Upcoming Workshop",
  "cover_image": "path/to/cover_image.jpg",
  "schedule": {
    "date": "20/11/24",
    "from_time": "10:00",
    "to_time": "12:00"
  },
  "description": "Join us for an insightful workshop on innovation.",
  "invitation_text": "Check out this exciting workshop!",
  "icon": "path/to/icon.jpg",
  "status": "published"
}
===================
PUT /api/v3/app/nudges/
- Update a Nudge
{
  "title": "Updated Workshop Title",
  "description": "New description for the updated workshop."
}
==========================
DELETE /api/v3/app/nudges/
- Delete a Nudge
{
  "message": "Nudge deleted successfully"
}


