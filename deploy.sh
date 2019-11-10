#!/bin/bash
set -e # termina o script com um código diferente de 0 se alguma coisa falhar

echo "[!] Iniciando build do projeto"

# realiza build do projeto p/ plataforma Android
ionic cordova build android --release --prod

exit 1