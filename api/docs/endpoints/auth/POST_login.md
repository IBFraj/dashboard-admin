# User Authentication

    POST /api/v1.0/auth/login

## Description

This router is used to authenticate user based on their username/password!

## Requires authentication

Nothing

## Parameters

**username** : required (type: String)
**password** : required (type: String)

## Return format

JSON

## Errors

**400 ParameterLength** Username and password must be at least 6 character length.  
**404 Element Not Found** there was no user using the username/password combination.  
**409 Duplicated Username** Username already exist.  
**422 Missing Parameter** there was a missing params (username, password).  
**500 UnkownError** this occure when unknown error was catched in the server side.  

## Example
**Request**

    curl -XPOST http://[SERVER_URI]/api/v1.0/auth/login -H 'Content-Type: application/json' -d "{'username': 'admin', 'password': 'admin'}"

**Return**

    {
        "error": true,
        "message": "Username length must be at least 6 character"
    }