# Delto Scripts
# Hub for open-source automation scripts.
# https://github.com/Deltologic/delto-scripts

_separator = ','

def script() -> None:
    csv_content = f'Have{_separator}a{_separator}nice{_separator}day{_separator}!\n'
    with open('example.csv', 'w') as csv_file:
        csv_file.write(csv_content)

if __name__ == '__main__':
    script()
