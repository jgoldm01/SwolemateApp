#!/usr/local/bin/python
# -*- coding: utf-8 -*-


from urllib2 import Request, urlopen
from json import dumps


def main():
    values = dumps({
        "username" : "ExampleUserName",
        "password" : "NOW IM FUCKING UP"
    })
    headers = {"Content-Type": "application/json"}
    dummyAPIURL = "http://private-e894f-swolemate.apiary-mock.com"
    request = Request(dummyAPIURL+"/login", data=values, headers=headers)
    response_body = urlopen(request).read()
    print response_body

if __name__ == '__main__':
    main()

