import random
import string
import tkinter as tk
from tkinter import ttk

# Dictionary of Namibian towns from Khomas, Erongo, Ohangwena, Omusati, and Kavango regions
NAMIBIAN_TOWNS = {
    "Khomas": ["Windhoek", "Rehoboth", "Groot Aub", "Havana"],
    "Erongo": ["Walvis Bay", "Swakopmund", "Arandis", "Henties Bay", "Omaruru"],
    "Ohangwena": ["Eenhana", "Ondangwa", "Okongo", "Engela"],
    "Omusati": ["Outapi", "Ruacana", "Oshikuku", "Okahao", "Onesi"],
    "Kavango": ["Rundu", "Oshakati", "Ongwediva"]
}

# List of common first names
FIRST_NAMES = ["John", "Michael", "David", "Christopher", "James", "Robert", "William", "Joseph", "Richard", "Thomas",
               "Elizabeth", "Mary", "Patricia", "Jennifer", "Linda", "Barbara", "Susan", "Jessica", "Sarah", "Karen",
               "Matthew", "Daniel", "Andrew", "Joshua", "Emily", "Amanda", "Samantha", "Rachel", "Stephanie", "Ashley",
               "Benjamin", "Jacob", "Ryan", "Nicholas", "Tyler", "Brandon", "Zachary", "Jonathan", "Christian", "Anthony"]

# List of common last names
LAST_NAMES = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
              "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson",
              "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King",
              "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter",
              "Gaoseb", "Haoseb", "Gawanab", "Katjiuongua", "Kauari", "Kavari", "Kudumo", "Shikongo", "Shilongo", "Tshikeva"]

# List of special characters for email addresses
SPECIAL_CHARS = {'_', '.', '-'}

# Precompute and cache static values
EMAIL_PROVIDER_WEIGHTS = [0.8, 0.2]  # 80% for gmail.com, 20% for icloud.com
REGIONS = list(NAMIBIAN_TOWNS.keys())
REGION_WEIGHTS = [0.3, 0.2, 0.2, 0.15, 0.15]  # Adjust these weights as needed

# Create the main window
root = tk.Tk()
root.title("Random Information Generator")

# Create text fields
LABELS = ["Name First:", "Name Last:", "Email:", "Town:", "@hotmesslifestyles", "'https://bestofnam.com/retail/'", "'https://bestofnam.com/personalities-icons/'"]
entries = [ttk.Entry(root) for _ in range(len(LABELS))]
copy_buttons = [ttk.Button(root, text="Copy", command=lambda entry=entry: copy_text(entry)) for entry in entries]

for i, (label, entry, button) in enumerate(zip(LABELS, entries, copy_buttons)):
    ttk.Label(root, text=label).grid(row=i, column=0, padx=5, pady=5, sticky="w")
    entry.grid(row=i, column=1, padx=5, pady=5)
    button.grid(row=i, column=2, padx=5, pady=5)

def randomize():
    """Randomize the information in the text fields."""
    global randomization_flag
    randomization_flag = True
    generate_random_info()
    # Restart the timer
    global time_left
    time_left = 40

def restart():
    """Clear the text fields and reset the randomization flag."""
    for entry in entries:
        entry.delete(0, tk.END)
    global randomization_flag
    randomization_flag = False

# Randomize button
randomize_button = ttk.Button(root, text="Randomize", command=randomize)
randomize_button.grid(row=len(LABELS), column=1, padx=5, pady=10)

# Restart button
restart_button = ttk.Button(root, text="Restart", command=restart)
restart_button.grid(row=len(LABELS), column=2, padx=5, pady=10)

# Initialize timer
time_left = 40

# Initialize randomization flag
randomization_flag = False

# Timer label
timer_label = ttk.Label(root, text=f"Next randomization in: {time_left} seconds")
timer_label.grid(row=len(LABELS) + 1, column=1, padx=5, pady=10)

def generate_random_info():
    """Generate and display random information in the text fields."""
    global randomization_flag
    if randomization_flag:
        # Generate random first name and last name
        first_name = random.choice(FIRST_NAMES)
        last_name = random.choice(LAST_NAMES)

        # Generate random email
        email_provider = random.choices(["gmail.com", "icloud.com"], weights=EMAIL_PROVIDER_WEIGHTS)[0]
        email_format = random.choice(["name.surname", "surname.name", "name_surname", "surname_name", "name-surname", "surname-name"])
        email_prefix = f"{first_name.lower() if 'name' in email_format else ''}{last_name.lower() if 'surname' in email_format else ''}"
        email_prefix += ''.join(random.choices(string.ascii_lowercase, k=random.randint(1, 3))) if random.random() < 0.3 else ''
        email_prefix += str(random.randint(1, 99)) if random.random() < 0.5 else ''
        email_prefix += random.choice(list(SPECIAL_CHARS)) if random.random() < 0.3 else ''
        email = f"{email_prefix}@{email_provider}"

        # Generate random Namibian town
        region_index = random.choices(range(len(REGIONS)), weights=REGION_WEIGHTS)[0]
        town = random.choice(NAMIBIAN_TOWNS[REGIONS[region_index]])

        # Update text fields
        for entry, value in zip(entries, [first_name, last_name, email, town, "@hotmesslifestyles", "https://bestofnam.com/retail/", "https://bestofnam.com/personalities-icons/"]):
            entry.delete(0, tk.END)
            entry.insert(0, value)

        # Schedule the next randomization after 40 seconds
        root.after(40000, generate_random_info)

def copy_text(entry):
    """Copy the text from the given entry widget to the clipboard."""
    root.clipboard_clear()
    root.clipboard_append(entry.get())
    root.update()

def update_timer():
    """Update the timer label and trigger randomization when the timer reaches 0."""
    global time_left
    time_left -= 1
    timer_label.config(text=f"Next randomization in: {time_left} seconds")
    if time_left == 0:
        generate_random_info()
        time_left = 40
    root.after(1000, update_timer)

# Update timer and randomize initially
update_timer()

# Start the main event loop
root.mainloop()