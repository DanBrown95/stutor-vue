echo off

rem batch file to run a script to create a db
rem 10/12/2017

sqlcmd -S localhost -E -i DialDash.sql

ECHO if no error messages appear DB was created
PAUSE