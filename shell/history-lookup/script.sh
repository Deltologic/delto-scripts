# Delto Scripts
# Hub for open-source automation scripts.
# https://github.com/Deltologic/delto-scripts

# use logic for bash
if [[ $SHELL == *bash ]] # * is used for pattern matching
then
  # get history file
  HISTORY_FILE=$HOME/.bash_history
  # search for commands and remove duplicates
  cat $HISTORY_FILE | grep $@ | sort | uniq
# use logic for zsh
elif [[ $SHELL == *zsh ]]
then
  # get history file
  HISTORY_FILE=$HOME/.zsh_history
  # search for commands, remove timestamp prefix, and remove duplicates
  cat $HISTORY_FILE | awk 'length($0)>5' | cut -c 16- | grep $@ | sort | uniq
# handle unknown shell
else
  echo "Unknown shell!"
fi
