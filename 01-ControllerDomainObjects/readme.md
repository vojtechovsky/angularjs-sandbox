# Start

# Install chockley

open cmd as administrator

@powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%systemdrive%\chocolatey\bin

close cmd

open cmd as admin

choco install nodejs

close cmd

open cmd as admin

## Install typings
The same goes for the Typings manager. It can be installed in the same way:

*npm install typings -g*

## Install typings for angular

## Install typings for angular
*typings install dt~angular-formly --global*


