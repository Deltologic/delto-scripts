# Search history of shell commands
## Description
Script for searching history of shell commands. Supports `bash` and `zsh`. The script output alphabetically sorted no-duplicate list of commands history.

## Languages
### Shell
#### Run
In order to start the script type:
```shell
bash script.sh
```

Or make the script executable:
```shell
chmod +x script.sh
./script.sh
```

Renaming it to `hist` and putting it in a directory added to `PATH` can serve as handy command:
```shell
# in directory added to PATH
mv script.sh hist
chmod +x hist

# in any directory
hist git
# sample output:
# git add .
# git pull
# git status
```