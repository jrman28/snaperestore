# Modules
import os
import csv

# Prompt user for title lookup
comic = input("What title are you looking for? ")

# Set path for file
csvpath = os.path.join("..", "Resources", "comic_books.csv")

# Set variable to check if we found the comic book
found = False

# Open the CSV using the UTF-8 encoding
with open(csvpath, encoding='UTF-8') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")

    # Loop through looking for the comic book
    for row in csvreader:
        if row[0] == comic:
            print(row[0] + " was published by " + row[8] + " in " + row[9])

            # Set variable to confirm we have found the comic book
            found = True

    # If the comic book is never found, alert the user
    if found is False:
        print("Sorry about this, we don't seem to have what you are looking for!")
