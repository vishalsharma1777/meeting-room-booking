import json
import random
import datetime

# Define the range of dates for October and November 2023
october_start = datetime.datetime(2023, 10, 1)
november_start = datetime.datetime(2023, 11, 5)
december_end = datetime.datetime(2023, 12, 5)

# List of users and rooms
users = [
    {
        "$oid": "6543b3ec631e7cc3c73de42c"
    },
    {
        "$oid": "6543b421631e7cc3c73de42d"
    },
    {
        "$oid": "6543b447631e7cc3c73de42e"
    },
    {
        "$oid": "6543b46d631e7cc3c73de42f"
    },
    {
        "$oid": "6543b48f631e7cc3c73de430"
    }
]

rooms = [
    {
        "$oid": "6543af71631e7cc3c73de424"
    },
    {
        "$oid": "6543af9a631e7cc3c73de425"
    },
    {
        "$oid": "6543b028631e7cc3c73de426"
    },
    {
        "$oid": "6543b111631e7cc3c73de427"
    },
    {
        "$oid": "6543b1ab631e7cc3c73de428"
    },
    {
        "$oid": "6543b1ee631e7cc3c73de429"
    }
]

# List of booking titles and descriptions
bookingTitles = ["React Review", "DOM Review", "Life Skills Class", "Deployment Meeting", "Objects Array"]
bookingDescriptions = ["Discuss project updates.", "Discuss review updates."]

# Specify the file path for the JSON file
json_file_path = "sample_booking_data_no_overlap.json"

# Initialize an empty list to store sample data
sample_data = []

# Generate a total of 100 data entries (20 for each user)
for _ in range(20):
    for user in users:
        # Randomly select a booking title and description
        title = random.choice(bookingTitles)
        description = random.choice(bookingDescriptions)

        # Generate random booking start time
        if random.random() < 0.5:  # 50% chance of upcoming booking
            start_time = november_start + datetime.timedelta(days=random.randint(1, 30))
        else:
            start_time = october_start + datetime.timedelta(days=random.randint(1, 30))

        # Generate random booking duration (multiples of 15 between 15 and 120)
        duration = random.randint(1, 8) * 15

        # Calculate booking end time
        end_time = start_time + datetime.timedelta(minutes=duration)

        # Create a sample booking entry
        booking_data = {
            "bookingUser": user,
            "bookingRoomID": random.choice(rooms),  # Random room selection
            "bookingStartTime": start_time.strftime("%Y-%m-%dT%H:%M:%S.000Z"),
            "bookingEndTime": end_time.strftime("%Y-%m-%dT%H:%M:%S.000Z"),
            "bookingDuration": duration,
            "bookingTitle": title,
            "bookingDescription": description
        }

        sample_data.append(booking_data)

# Save the sample data to a JSON file
with open(json_file_path, "w") as json_file:
    json.dump(sample_data, json_file, indent=4)

print(f"Sample data saved to {json_file_path}")
