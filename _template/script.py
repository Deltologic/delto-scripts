# Delto Scripts
# Hub for open-source automation scripts.
# https://github.com/Deltologic/delto-scripts

# define CSV columns separator
_separator = ','

def script() -> None:
    # prepare CSV file structure
    csv_content = f'Have{_separator}a{_separator}nice{_separator}day{_separator}!\n'
    # save the CSV file
    with open('example.csv', 'w') as csv_file:
        csv_file.write(csv_content)

# start the script
if __name__ == '__main__':
    script()
