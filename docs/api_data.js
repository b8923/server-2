define({ "api": [
  {
    "type": "post",
    "url": "/branch",
    "title": "Create Branch",
    "name": "Create_Branch",
    "group": "Branch",
    "permission": [
      {
        "name": "auth",
        "title": "User access",
        "description": "<p>All authenticated users can access this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Body Parameters": [
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Branch unique id.</p>"
          },
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Branch name. (6-30 chars, no whitespace)</p>"
          },
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "parentid",
            "description": "<p>Unique id of the requested parent branch. A Child Branch Request will be sent to this branch.</p>"
          }
        ]
      }
    },
    "filename": "./routers/branch/router.js",
    "groupTitle": "Branch",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/:branchid",
    "title": "Delete Branch",
    "name": "Delete_Branch",
    "description": "<p>Permanently delete a root branch. The child branches are made into root branches.</p>",
    "group": "Branch",
    "permission": [
      {
        "name": "admin",
        "title": "Admin access",
        "description": "<p>Only authenticated site administrators can access this route (moderators of the root branch).</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "branchid",
            "description": "<p>Branch unique id.</p>"
          }
        ]
      }
    },
    "filename": "./routers/branch/router.js",
    "groupTitle": "Branch",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:branchid",
    "title": "Get Branch",
    "name": "Get_Branch",
    "group": "Branch",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "branchid",
            "description": "<p>Branch unique id.</p>"
          }
        ]
      }
    },
    "filename": "./routers/branch/router.js",
    "groupTitle": "Branch",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:branchid/subbranches?timeafter=<timeafter>",
    "title": "Get Child Branches",
    "name": "Get_Child_Branches",
    "description": "<p>Get the child branches of the specified branch</p>",
    "group": "Branch",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "branchid",
            "description": "<p>Branch unique id.</p>"
          }
        ],
        "Query Parameters": [
          {
            "group": "Query Parameters",
            "type": "Number",
            "optional": false,
            "field": "timeafter",
            "description": "<p>Only fetch child branches created after this time (UNIX timestamp)</p>"
          },
          {
            "group": "Query Parameters",
            "type": "String",
            "optional": false,
            "field": "lastBranchId",
            "description": "<p>The id of the last branch seen by the client. Results <em>after</em> this branch will be returned, facilitating pagination.</p>"
          },
          {
            "group": "Query Parameters",
            "type": "String",
            "optional": false,
            "field": "query",
            "description": "<ul> <li>query to search by</li> </ul>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>An array of child branch objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200\n   {\n    \"message\": \"Success\",\n    \"data\": [\n      {\n        \"parentid\": \"science\",\n        \"id\": \"physics\",\n        \"date\": 1471641760077,\n        \"creator\": \"johndoe\",\n        \"name\": \"Physics\"\n      },\n      {\n        \"parentid\": \"science\",\n        \"id\": \"chemistry\",\n        \"date\": 1471642069522,\n        \"creator\": \"johndoe\",\n        \"name\": \"Chemistry\"\n      },\n      {\n        \"parentid\": \"science\",\n        \"id\": \"biology\",\n        \"date\": 1471642084414,\n        \"creator\": \"johndoe\",\n        \"name\": \"Biology\"\n      }\n    ]\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/branch/router.js",
    "groupTitle": "Branch",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:branchid/cover",
    "title": "Get Cover",
    "name": "Get_Cover",
    "description": "<p>Get a pre-signed URL where the specified branch's cover picture can be accessed.</p>",
    "group": "Branch",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "branchid",
            "description": "<p>Branch unique id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>The presigned URL.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200\n{\n  \"message\": \"Success\",\n  \"data\": \"<url>\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/branch/router.js",
    "groupTitle": "Branch",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:branchid/cover",
    "title": "Get Cover Thumbnail",
    "name": "Get_Cover_Thumbnail",
    "description": "<p>Get a pre-signed URL where the thumbnail for the specified branch's cover picture can be accessed.</p>",
    "group": "Branch",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "branchid",
            "description": "<p>Branch unique id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>The presigned URL.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200\n{\n  \"message\": \"Success\",\n  \"data\": \"<url>\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/branch/router.js",
    "groupTitle": "Branch",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:branchid/picture-upload-url",
    "title": "Get Cover Upload URL",
    "name": "Get_Cover_Upload_URL",
    "description": "<p>Get a pre-signed URL to which a cover picture for the specified branch can be uploaded.</p>",
    "group": "Branch",
    "permission": [
      {
        "name": "mod",
        "title": "Mod access",
        "description": "<p>Only authenticated moderators of the specified branch can access this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "branchid",
            "description": "<p>Branch unique id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>The presigned URL.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200\n{\n  \"message\": \"Success\",\n  \"data\": \"<url>\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/branch/router.js",
    "groupTitle": "Branch",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "403-Forbidden",
            "description": "<p>The user does not have the necessary permissions to perform this request.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"message\": \"Access denied\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:branchid/picture",
    "title": "Get Picture",
    "name": "Get_Picture",
    "description": "<p>Get a pre-signed URL where the specified branch's profile picture can be accessed.</p>",
    "group": "Branch",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "branchid",
            "description": "<p>Branch unique id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>The presigned URL.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200\n{\n  \"message\": \"Success\",\n  \"data\": \"<url>\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/branch/router.js",
    "groupTitle": "Branch",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:branchid/picture-thumb",
    "title": "Get Picture Thumbnail",
    "name": "Get_Picture_Thumbnail",
    "description": "<p>Get a pre-signed URL where the thumbnail for the specified branch's profile picture can be accessed.</p>",
    "group": "Branch",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "branchid",
            "description": "<p>Branch unique id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>The presigned URL.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200\n{\n  \"message\": \"Success\",\n  \"data\": \"<url>\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/branch/router.js",
    "groupTitle": "Branch",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:branchid/picture-upload-url",
    "title": "Get Picture Upload URL",
    "name": "Get_Picture_Upload_URL",
    "description": "<p>Get a pre-signed URL to which a profile picture for the specified branch can be uploaded.</p>",
    "group": "Branch",
    "permission": [
      {
        "name": "mod",
        "title": "Mod access",
        "description": "<p>Only authenticated moderators of the specified branch can access this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "branchid",
            "description": "<p>Branch unique id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>The presigned URL.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200\n{\n  \"message\": \"Success\",\n  \"data\": \"<url>\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/branch/router.js",
    "groupTitle": "Branch",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "403-Forbidden",
            "description": "<p>The user does not have the necessary permissions to perform this request.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"message\": \"Access denied\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:branchid/modlog",
    "title": "Get The Moderator Action Log",
    "name": "Get_The_Moderator_Action_Log",
    "description": "<p>Get a list of actions performed by moderators on this branch</p>",
    "group": "Branch",
    "permission": [
      {
        "name": "mod",
        "title": "Mod access",
        "description": "<p>Only authenticated moderators of the specified branch can access this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "branchid",
            "description": "<p>Branch unique id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>An array of moderator action objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200\n   {\n    \"message\": \"Success\",\n    \"data\": [\n      {\n        \"username\": \"johndoe\",\n        \"date\": 1471868547062,\n        \"action\": \"answer-subbranch-request\",\n        \"data\": \"{\\\"response\\\":\\\"accept\\\",\\\"childid\\\":\\\"physics\\\",\\\"parentid\\\":\\\"science\\\",\\\"childmod\\\":\\\"janedoe\\\"}\",\n        \"branchid\": \"science\"\n      },\n      {\n        \"username\": \"johndoe\",\n        \"date\": 1471868547062,\n        \"action\": \"answer-subbranch-request\",\n        \"data\": \"{\\\"response\\\":\\\"reject\\\",\\\"childid\\\":\\\"physics\\\",\\\"parentid\\\":\\\"science\\\",\\\"childmod\\\":\\\"janedoe\\\"}\",\n        \"branchid\": \"science\"\n      },\n      {\n        \"username\": \"johndoe\",\n        \"date\": 1471958603485,\n        \"action\": \"addmod\",\n        \"data\": \"james\",\n        \"branchid\": \"science\"\n      }\n    ]\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/branch/router.js",
    "groupTitle": "Branch",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/:branchid",
    "title": "Update Branch",
    "name": "Update_Branch",
    "group": "Branch",
    "permission": [
      {
        "name": "mod",
        "title": "Mod access",
        "description": "<p>Only authenticated moderators of the specified branch can access this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "branchid",
            "description": "<p>Branch unique id.</p>"
          }
        ],
        "Body Parameters": [
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Branch visible name. [optional]</p>"
          },
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Branch description. [optional]</p>"
          },
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "rules",
            "description": "<p>Branch rules. [optional]</p>"
          }
        ]
      }
    },
    "filename": "./routers/branch/router.js",
    "groupTitle": "Branch",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./docs/main.js",
    "group": "C__Users_Dean_Desktop_weco_testingnewstuff_deployment_server_docs_main_js",
    "groupTitle": "C__Users_Dean_Desktop_weco_testingnewstuff_deployment_server_docs_main_js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/constant/:id",
    "title": "Get a global constant",
    "name": "Get_a_global_constant",
    "group": "Constants",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the constant to fetch</p>"
          }
        ]
      }
    },
    "filename": "./routers/constant/router.js",
    "groupTitle": "Constants",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/constant",
    "title": "Get all global constants",
    "name": "Get_all_global_constants",
    "group": "Constants",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "filename": "./routers/constant/router.js",
    "groupTitle": "Constants",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/constant/:id",
    "title": "Update a global constant",
    "name": "Update_a_global_constant",
    "group": "Constants",
    "permission": [
      {
        "name": "admin",
        "title": "Admin access",
        "description": "<p>Only authenticated site administrators can access this route (moderators of the root branch).</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the constant to update</p>"
          }
        ],
        "Body Parameters": [
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>The new value of the constant</p>"
          }
        ]
      }
    },
    "filename": "./routers/constant/router.js",
    "groupTitle": "Constants",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/proxy",
    "title": "Proxy insecure resource",
    "name": "Proxy_insecure_resource",
    "description": "<p>Proxy a resource on an insecure endpoint over https</p>",
    "group": "Misc",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>The url of the resource to proxy</p>"
          }
        ]
      }
    },
    "filename": "./routers/index.js",
    "groupTitle": "Misc",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "403-Forbidden",
            "description": "<p>The user does not have the necessary permissions to perform this request.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"message\": \"Access denied\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/branch/:branchid/mods",
    "title": "Add Branch Mod",
    "name": "Add_Branch_Mod",
    "group": "Mods",
    "permission": [
      {
        "name": "mod",
        "title": "Mod access",
        "description": "<p>Only authenticated moderators of the specified branch can access this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "branchid",
            "description": "<p>Branch unique id.</p>"
          }
        ],
        "Body Parameters": [
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>New moderator's username.</p>"
          }
        ]
      }
    },
    "filename": "./routers/mods/router.js",
    "groupTitle": "Mods",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "403-Forbidden",
            "description": "<p>The user does not have the necessary permissions to perform this request.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"message\": \"Access denied\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/branch/:branchid/mods/:username",
    "title": "Delete Branch Mod",
    "name": "Delete_Branch_Mod",
    "description": "<p>Delete a moderator of a branch. A moderator can only remove mods who were added after themselves.</p>",
    "group": "Mods",
    "permission": [
      {
        "name": "mod",
        "title": "Mod access",
        "description": "<p>Only authenticated moderators of the specified branch can access this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "branchid",
            "description": "<p>Branch unique id.</p>"
          },
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Moderator username</p>"
          }
        ]
      }
    },
    "filename": "./routers/mods/router.js",
    "groupTitle": "Mods",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "403-Forbidden",
            "description": "<p>The user does not have the necessary permissions to perform this request.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"message\": \"Access denied\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/branch/:branchid/mods",
    "title": "Get Branch Mods",
    "name": "Get_Branch_Mods",
    "group": "Mods",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "branchid",
            "description": "<p>Branch unique id.</p>"
          }
        ]
      }
    },
    "filename": "./routers/mods/router.js",
    "groupTitle": "Mods",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "poll",
    "url": "/:postid/answer",
    "title": "Create an answer for a poll",
    "name": "Create_Poll_Answer",
    "group": "Polls",
    "permission": [
      {
        "name": "auth",
        "title": "User access",
        "description": "<p>All authenticated users can access this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "postid",
            "description": "<p>Id of the post (of type=poll) that the Answer belongs to</p>"
          }
        ],
        "Body Parameters": [
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>The textual description of the Answer</p>"
          }
        ]
      }
    },
    "filename": "./routers/poll/router.js",
    "groupTitle": "Polls",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "poll",
    "url": "/:postid/answer",
    "title": "Get the answers for a particular poll",
    "name": "Get_Poll_Answers",
    "group": "Polls",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "postid",
            "description": "<p>The unique id of the post</p>"
          }
        ],
        "Query Parameters": [
          {
            "group": "Query Parameters",
            "type": "String",
            "optional": false,
            "field": "sortBy",
            "description": "<p>Whether to sort the results by 'votes' or 'date'</p>"
          }
        ]
      }
    },
    "filename": "./routers/poll/router.js",
    "groupTitle": "Polls",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/poll/:postid/vote",
    "title": "Vote Poll Answer",
    "name": "Vote_Poll_Answer",
    "group": "Polls",
    "permission": [
      {
        "name": "auth",
        "title": "User access",
        "description": "<p>All authenticated users can access this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "postid",
            "description": "<p>The unique id of the post.</p>"
          }
        ],
        "Body Parameters": [
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "vote",
            "description": "<p>Vote direction ['up', 'down']</p>"
          }
        ]
      }
    },
    "filename": "./routers/poll/router.js",
    "groupTitle": "Polls",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/post/:postid/comments",
    "title": "Create Comment",
    "name": "Create_Comment",
    "group": "Posts",
    "permission": [
      {
        "name": "auth",
        "title": "User access",
        "description": "<p>All authenticated users can access this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "postid",
            "description": "<p>Post unique id.</p>"
          }
        ],
        "Body Parameters": [
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "parentid",
            "description": "<p>Parent comment's unique id.</p>"
          },
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Comment text</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>The generated id for the new comment</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200\n   {\n     \"message\": \"Success\",\n     \"data\": \"commentid\"\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/post/router.js",
    "groupTitle": "Posts",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/post",
    "title": "Create Post",
    "name": "Create_Post",
    "group": "Posts",
    "permission": [
      {
        "name": "auth",
        "title": "User access",
        "description": "<p>All authenticated users can access this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Body Parameters": [
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Post title</p>"
          },
          {
            "group": "Body Parameters",
            "type": "String[]",
            "optional": false,
            "field": "branchids",
            "description": "<p>Array of unique branch ids to which the post should be tagged. The post will also be tagged to all branches which appear above these branches.</p>"
          },
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>The post type ['text', 'image', 'video', 'audio', 'page']</p>"
          },
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>The post's body of text (for 'text' types) or the URL of the resource (for all other types)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>The generated id for the new post</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200\n   {\n     \"message\": \"Success\",\n     \"data\": \"postid\"\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/post/router.js",
    "groupTitle": "Posts",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/post/:postid/comments/:commentid",
    "title": "Delete Comment",
    "name": "Delete_Comment",
    "group": "Posts",
    "permission": [
      {
        "name": "auth",
        "title": "User access",
        "description": "<p>All authenticated users can access this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "postid",
            "description": "<p>Post unique id.</p>"
          },
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "commentid",
            "description": "<p>Comment unique id</p>"
          }
        ]
      }
    },
    "filename": "./routers/post/router.js",
    "groupTitle": "Posts",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/post/:postid",
    "title": "Delete Post",
    "name": "Delete_Post",
    "group": "Posts",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "postid",
            "description": "<p>The unique id of the post</p>"
          }
        ]
      }
    },
    "filename": "./routers/post/router.js",
    "groupTitle": "Posts",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/post/:postid/flag",
    "title": "Flag post",
    "name": "Flag_post",
    "description": "<p>Flag a post to the branch moderators</p>",
    "group": "Posts",
    "permission": [
      {
        "name": "auth",
        "title": "User access",
        "description": "<p>All authenticated users can access this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "postid",
            "description": "<p>Post unique id.</p>"
          }
        ],
        "Body Parameters": [
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "flag_type",
            "description": "<p>The reason the post is being flagged. One of: branch_rules, site_rules, wrong_type, nsfw</p>"
          },
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "branchid",
            "description": "<p>The id of the branch on which to flag the post</p>"
          }
        ]
      }
    },
    "filename": "./routers/post/router.js",
    "groupTitle": "Posts",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/branch/:branchid/posts?timeafter=<timeafter>&stat=<stat>&postType=<postType>&sortBy=<sortBy>",
    "title": "Get Branch Posts",
    "name": "Get_Branch_Posts",
    "group": "Posts",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "branchid",
            "description": "<p>Branch unique id.</p>"
          }
        ],
        "Query Parameters": [
          {
            "group": "Query Parameters",
            "type": "Number",
            "optional": false,
            "field": "timeafter",
            "description": "<p>Only fetch posts created after this time (UNIX timestamp). [optional; default 0]</p>"
          },
          {
            "group": "Query Parameters",
            "type": "String",
            "optional": false,
            "field": "stat",
            "description": "<p>The stat type to sort the posts by ['global', 'local', 'individual'] [optional; default 'individual']</p>"
          },
          {
            "group": "Query Parameters",
            "type": "String",
            "optional": false,
            "field": "flag",
            "description": "<p>Boolean indicating whether to only fetched flagged posts</p>"
          },
          {
            "group": "Query Parameters",
            "type": "String",
            "optional": false,
            "field": "postType",
            "description": "<p>String indicating the type of post to fetch ['all', 'text', 'image', 'page', 'video', 'audio', 'poll']</p>"
          },
          {
            "group": "Query Parameters",
            "type": "String",
            "optional": false,
            "field": "sortBy",
            "description": "<p>String indicating how to sort the results ['date, 'points']</p>"
          },
          {
            "group": "Query Parameters",
            "type": "String",
            "optional": false,
            "field": "lastPostId",
            "description": "<p>The id of the last post seen by the client. Results <em>after</em> this post will be returned, facilitating pagination.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>An array of post objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200\n   {\n     \"message\": \"Success\",\n     \"data\": [\n       {\n         \"id\": \"johndoe-1471868592207\",\n         \"date\": 1471868592207,\n         \"individual\": 0,\n         \"branchid\": \"science\",\n         \"type\": \"text\"\n       },\n       {\n        \"id\": \"johndoe-1471630511498\",\n        \"date\": 1471630511498,\n        \"individual\": 0,\n        \"branchid\": \"science\",\n        \"type\": \"video\"\n      },\n      {\n        \"id\": \"johndoe-1471889497552\",\n        \"date\": 1471889497552,\n        \"individual\": 0,\n        \"branchid\": \"science\",\n        \"type\": \"image\"\n      }\n    ]\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/branch-posts/router.js",
    "groupTitle": "Posts",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/post/:postid/comments/:commentid",
    "title": "Get Comment",
    "name": "Get_Comment",
    "group": "Posts",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "postid",
            "description": "<p>Post unique id.</p>"
          },
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "commentid",
            "description": "<p>Comment unique id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>A single comment object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200\n{\n  \"message\": \"Success\",\n  \"data\": {\n    \"id\": \"johndoe-1471884687736\",\n    \"down\": 0,\n    \"individual\": 1,\n    \"parentid\": \"none\",\n    \"rank\": 0,\n    \"date\": 1471884687736,\n    \"postid\": \"janedoe-1471642545455\",\n    \"up\": 1,\n    \"replies\": 0,\n    \"data\": {\n      \"text\": \"comment text\",\n      \"id\": \"johndoe-1471884687736\",\n      \"date\": 1471884687736,\n      \"creator\": \"johndoe\",\n      \"edited\": false\n    }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/post/router.js",
    "groupTitle": "Posts",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/post/:postid/comments?parentid=<parentid>&sort=<sort>",
    "title": "Get Comments",
    "name": "Get_Comments",
    "group": "Posts",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "postid",
            "description": "<p>Post unique id.</p>"
          }
        ],
        "Query Parameters": [
          {
            "group": "Query Parameters",
            "type": "String",
            "optional": false,
            "field": "parentid",
            "description": "<p>The unique id of the parent comment (for root comments, parentid=none)</p>"
          },
          {
            "group": "Query Parameters",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>The metric by which to sort the comments ['points', 'replies', 'date']</p>"
          },
          {
            "group": "Query Parameters",
            "type": "String",
            "optional": false,
            "field": "lastCommentId",
            "description": "<p>The id of the last comment seen by the client. Results <em>after</em> this comment will be returned, facilitating pagination.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>An array of comment objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200\n{\n  \"message\": \"Success\",\n  \"data\": [\n    {\n      \"id\": \"johndoe-1471884687736\",\n      \"down\": 0,\n      \"individual\": 1,\n      \"parentid\": \"none\",\n      \"rank\": 0,\n      \"date\": 1471884687736,\n      \"up\": 1,\n      \"postid\": \"johndoe-1471642545455\",\n      \"replies\": 0\n    },\n    {\n      \"id\": \"janedoe-1471884567072\",\n      \"down\": 0,\n      \"individual\": 0,\n      \"parentid\": \"johndoe-1471884687736\",\n      \"rank\": 0,\n      \"date\": 1471884567072,\n      \"up\": 0,\n      \"postid\": \"johndoe-1471642545455\",\n      \"replies\": 2\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/post/router.js",
    "groupTitle": "Posts",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/post/:postid/picture",
    "title": "Get Picture",
    "name": "Get_Picture",
    "description": "<p>Get a pre-signed URL where the specified post's picture can be accessed.</p>",
    "group": "Posts",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "postid",
            "description": "<p>Post unique id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>The presigned URL.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200\n{\n  \"message\": \"Success\",\n  \"data\": \"URL\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/post/router.js",
    "groupTitle": "Posts",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/post/:postid/picture-thumb",
    "title": "Get Picture Thumbnail",
    "name": "Get_Picture_Thumbnail",
    "description": "<p>Get a pre-signed URL where the thumbnail for the specified post's picture can be accessed.</p>",
    "group": "Posts",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "postid",
            "description": "<p>Post unique id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>The presigned URL.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200\n{\n  \"message\": \"Success\",\n  \"data\": \"URL\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/post/router.js",
    "groupTitle": "Posts",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/post/:postid/picture-upload-url",
    "title": "Get Picture Upload URL",
    "name": "Get_Picture_Upload_URL",
    "description": "<p>Get a pre-signed URL to which a picture for the specified post can be uploaded.</p>",
    "group": "Posts",
    "permission": [
      {
        "name": "auth",
        "title": "User access",
        "description": "<p>All authenticated users can access this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "postid",
            "description": "<p>Post unique id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>The presigned URL.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200\n{\n  \"message\": \"Success\",\n  \"data\": \"URL\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/post/router.js",
    "groupTitle": "Posts",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "403-Forbidden",
            "description": "<p>The user does not have the necessary permissions to perform this request.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"message\": \"Access denied\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/post/:postid",
    "title": "Get Post",
    "name": "Get_Post",
    "group": "Posts",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "branch",
            "description": "<p>The unique branch id.</p>"
          },
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "postid",
            "description": "<p>The unique id of the post</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>The generated id for the new post</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200\n   {\n     \"message\": \"Success\",\n     \"data\": {\n       \"id\": \"johndoe-1471642545455\",\n       \"down\": 1,\n       \"individual\": 1,\n       \"branchid\": \"science\",\n       \"comment_count\": 0,\n       \"local\": 1,\n       \"date\": 1471642545455,\n       \"up\": 2,\n       \"type\": \"page\",\n       \"data\": {\n         \"text\": \"URL to resource\",\n         \"id\": \"johndoe-1471642545455\",\n         \"creator\": \"johndoe\",\n         \"title\": \"Post Title\"\n       }\n     }\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/post/router.js",
    "groupTitle": "Posts",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/branch/:branchid/posts/:postid",
    "title": "Get Post on Branch",
    "name": "Get_Post_on_Branch",
    "group": "Posts",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "branchid",
            "description": "<p>Branch unique id.</p>"
          },
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "postid",
            "description": "<p>Post unique id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>An array containing a single post object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200\n   {\n     \"message\": \"Success\",\n     \"data\": [\n        {\n          \"id\": \"johndoe-1471630511498\",\n          \"down\": 0,\n          \"individual\": 0,\n          \"branchid\": \"science\",\n          \"comment_count\": 0,\n          \"local\": 0,\n          \"date\": 1471630511498,\n          \"up\": 0,\n          \"type\": \"video\"\n        }\n     ]\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/branch-posts/router.js",
    "groupTitle": "Posts",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/post",
    "title": "/:postid/repost reposts a picture",
    "name": "Repost_post_to_other_branch",
    "group": "Posts",
    "permission": [
      {
        "name": "auth",
        "title": "User access",
        "description": "<p>All authenticated users can access this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Body Parameters": [
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "pid",
            "description": ""
          },
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "link",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "OK",
            "description": ""
          }
        ]
      }
    },
    "filename": "./routers/post/router.js",
    "groupTitle": "Posts",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/branch/:branchid/posts/:postid/resolve",
    "title": "Resolve the flags on a Post",
    "name": "Resolve_the_flags_on_a_Post",
    "group": "Posts",
    "permission": [
      {
        "name": "mod",
        "title": "Mod access",
        "description": "<p>Only authenticated moderators of the specified branch can access this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "branchid",
            "description": "<p>Branch unique id.</p>"
          },
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "postid",
            "description": "<p>Post unique id.</p>"
          }
        ],
        "Body Parameters": [
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>The action to take to resolve the post. One of: change_type, remove, approve, mark_nsfw</p>"
          },
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Required iff. action=change_type. The new type of the post</p>"
          },
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "reason",
            "description": "<p>Required iff. action=remove. One of: site_rules, branch_rules</p>"
          },
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Required iff. action=remove. An explanatory reason to send to the OP for why the post is being removed.</p>"
          }
        ]
      }
    },
    "filename": "./routers/branch-posts/router.js",
    "groupTitle": "Posts",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/scraper",
    "title": "Scrap link for meta data to preview in the create post modal.",
    "name": "Scrap_meta_data_",
    "description": "<p>Scraps the URL for any meta data we can display on the client.</p>",
    "group": "Posts",
    "permission": [
      {
        "name": "auth",
        "title": "User access",
        "description": "<p>All authenticated users can access this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>Website url (todo).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>The suggested picture URL.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200\n{\n  \"message\": \"Success\",\n  \"data\": \"https://weco.io/picture.jpg\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/scraper/router.js",
    "groupTitle": "Posts",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/post/:postid/comments/:commentid",
    "title": "Update/Vote Comment",
    "name": "Update_Vote_Comment",
    "group": "Posts",
    "permission": [
      {
        "name": "auth",
        "title": "User access",
        "description": "<p>All authenticated users can access this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "postid",
            "description": "<p>Post unique id.</p>"
          },
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "commentid",
            "description": "<p>Comment unique id</p>"
          }
        ],
        "Body Parameters": [
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "vote",
            "description": "<p>Vote direction ['up', 'down'] [optional]</p>"
          },
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Updated comment text [optional]</p>"
          }
        ]
      }
    },
    "filename": "./routers/post/router.js",
    "groupTitle": "Posts",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/post",
    "title": "/:postid/picture-upload-by-url uploads a picture using it's url",
    "name": "Upload_Picture_By_Upload_URL",
    "group": "Posts",
    "permission": [
      {
        "name": "auth",
        "title": "User access",
        "description": "<p>All authenticated users can access this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Body Parameters": [
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "pid",
            "description": ""
          },
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "link",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "OK",
            "description": ""
          }
        ]
      }
    },
    "filename": "./routers/post/router.js",
    "groupTitle": "Posts",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/branch/:branchid/posts/:postid",
    "title": "Vote on Post",
    "name": "Vote_on_Post",
    "group": "Posts",
    "permission": [
      {
        "name": "auth",
        "title": "User access",
        "description": "<p>All authenticated users can access this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "branchid",
            "description": "<p>Branch unique id.</p>"
          },
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "postid",
            "description": "<p>Post unique id.</p>"
          }
        ],
        "Body Parameters": [
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "vote",
            "description": "<p>Vote direction ['up', 'down']</p>"
          }
        ]
      }
    },
    "filename": "./routers/branch-posts/router.js",
    "groupTitle": "Posts",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/branch/:branchid/requests/subbranches/:childid",
    "title": "Answer Child Branch Request",
    "name": "Answer_Child_Branch_Request",
    "group": "Requests",
    "permission": [
      {
        "name": "mod",
        "title": "Mod access",
        "description": "<p>Only authenticated moderators of the specified branch can access this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "branchid",
            "description": "<p>Branch unique id.</p>"
          },
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "childid",
            "description": "<p>Child Branch unique id.</p>"
          }
        ],
        "Body Parameters": [
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>The action to take ['accept', 'reject']</p>"
          }
        ]
      }
    },
    "filename": "./routers/requests/router.js",
    "groupTitle": "Requests",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/branch/:branchid/requests/subbranches/:childid",
    "title": "Create Child Branch Request",
    "name": "Create_Child_Branch_Request",
    "group": "Requests",
    "permission": [
      {
        "name": "mod",
        "title": "Mod access",
        "description": "<p>Only authenticated moderators of the specified branch can access this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "branchid",
            "description": "<p>Branch unique id.</p>"
          },
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "childid",
            "description": "<p>Child Branch unique id.</p>"
          }
        ]
      }
    },
    "filename": "./routers/requests/router.js",
    "groupTitle": "Requests",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/branch/:branchid/requests/subbranches",
    "title": "Get Child Branch Requests",
    "name": "Get_Child_Branch_Requests",
    "group": "Requests",
    "permission": [
      {
        "name": "mod",
        "title": "Mod access",
        "description": "<p>Only authenticated moderators of the specified branch can access this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "branchid",
            "description": "<p>Branch unique id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>An array of child branch request objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200\n   {\n     \"message\": \"Success\",\n     \"data\": [\n       {\n         \"parentid\": \"science\",\n         \"date\": 1471961075596,\n         \"creator\": \"johndoe\",\n         \"childid\": \"physics\"\n       }\n    ]\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/requests/router.js",
    "groupTitle": "Requests",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/search",
    "title": "get results from search",
    "name": "search_weco",
    "group": "Search",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "filename": "./routers/search/router.js",
    "groupTitle": "Search",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/search",
    "title": "get results from search",
    "name": "search_weco",
    "group": "Search",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "filename": "./routers/search/router.js",
    "groupTitle": "Search",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/users",
    "title": "get results from search",
    "name": "search_weco",
    "group": "Search",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "filename": "./routers/search/router.js",
    "groupTitle": "Search",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "searches",
    "title": "everything",
    "name": "search_weco",
    "group": "Search",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "filename": "./routers/search/router.js",
    "groupTitle": "Search",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/user/me",
    "title": "Delete Self",
    "name": "Delete_Self",
    "group": "User",
    "permission": [
      {
        "name": "self",
        "title": "Self access",
        "description": "<p>Only authenticated users can access themselves on this route.</p>"
      }
    ],
    "version": "1.0.0",
    "filename": "./routers/user/router.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "403-Forbidden",
            "description": "<p>The user does not have the necessary permissions to perform this request.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"message\": \"Access denied\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/:username/branches/followed",
    "title": "Follow a branch",
    "name": "Follow_a_branch",
    "description": "<p>Follow a branch</p>",
    "group": "User",
    "permission": [
      {
        "name": "self",
        "title": "Self access",
        "description": "<p>Only authenticated users can access themselves on this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's unique username.</p>"
          }
        ],
        "Body Parameters": [
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "branchid",
            "description": "<p>The id of the branch to follow</p>"
          }
        ]
      }
    },
    "filename": "./routers/user/router.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/me/cover-upload-url",
    "title": "Get Cover Upload URL",
    "name": "Get_Cover_Upload_URL",
    "description": "<p>Get a pre-signed URL to which a cover picture for the authenticated user can be uploaded.</p>",
    "group": "User",
    "permission": [
      {
        "name": "self",
        "title": "Self access",
        "description": "<p>Only authenticated users can access themselves on this route.</p>"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>The presigned URL.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200\n{\n  \"message\": \"Success\",\n  \"data\": \"<url>\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/user/router.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "403-Forbidden",
            "description": "<p>The user does not have the necessary permissions to perform this request.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"message\": \"Access denied\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/me/picture-upload-url",
    "title": "Get Picture Upload URL",
    "name": "Get_Picture_Upload_URL",
    "description": "<p>Get a pre-signed URL to which a profile picture for the authenticated user can be uploaded.</p>",
    "group": "User",
    "permission": [
      {
        "name": "self",
        "title": "Self access",
        "description": "<p>Only authenticated users can access themselves on this route.</p>"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>The presigned URL.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200\n{\n  \"message\": \"Success\",\n  \"data\": \"<url>\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/user/router.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "403-Forbidden",
            "description": "<p>The user does not have the necessary permissions to perform this request.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"message\": \"Access denied\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/user/me",
    "title": "Get Self",
    "name": "Get_Self",
    "group": "User",
    "permission": [
      {
        "name": "self",
        "title": "Self access",
        "description": "<p>Only authenticated users can access themselves on this route.</p>"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "Number",
            "optional": false,
            "field": "datejoined",
            "description": "<p>Date the user joined (UNIX timestamp).</p>"
          },
          {
            "group": "Successes",
            "type": "Number",
            "optional": false,
            "field": "dob",
            "description": "<p>User's date of birth (UNIX timestamp).</p>"
          },
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email address.</p>"
          },
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>User's name.</p>"
          },
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's unique username.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "{\n  \"message\": \"Success\",\n  \"data\": {\n    \"datejoined\": 1469017726490,\n    \"dob\": null,\n    \"email\": \"john@doe.com\",\n    \"name\": \"John\",\n    \"username\": \"johndoe\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/user/router.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "403-Forbidden",
            "description": "<p>The user does not have the necessary permissions to perform this request.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"message\": \"Access denied\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/user/:username",
    "title": "Get User",
    "name": "Get_User",
    "group": "User",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      },
      {
        "name": "auth",
        "title": "User access",
        "description": "<p>All authenticated users can access this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's unique username.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "Number",
            "optional": false,
            "field": "datejoined",
            "description": "<p>Date the user joined (UNIX timestamp).</p>"
          },
          {
            "group": "Successes",
            "type": "Number",
            "optional": false,
            "field": "dob",
            "description": "<p>User's date of birth (UNIX timestamp).</p>"
          },
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email address. [iff. the specified user is the authenticated user]</p>"
          },
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's name.</p>"
          },
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's unique username.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200\n{\n  \"message\": \"Success\",\n  \"data\": {\n    \"datejoined\": 1469017726490,\n    \"dob\": null,\n    \"name\": \"John\",\n    \"username\": \"johndoe\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/user/router.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "403-Forbidden",
            "description": "<p>The user does not have the necessary permissions to perform this request.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"message\": \"Access denied\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:username/notifications",
    "title": "Get User Notifications",
    "name": "Get_User_Notifications",
    "description": "<p>Get a list of notifications for the specified user, or a count of the number of unread ones.</p>",
    "group": "User",
    "permission": [
      {
        "name": "self",
        "title": "Self access",
        "description": "<p>Only authenticated users can access themselves on this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's unique username.</p>"
          }
        ],
        "Query Parameters": [
          {
            "group": "Query Parameters",
            "type": "String",
            "optional": false,
            "field": "unreadCount",
            "description": "<p>Boolean indicating whether to fetch the number of unread notifications rather than notifications themselves.</p>"
          },
          {
            "group": "Query Parameters",
            "type": "String",
            "optional": false,
            "field": "lastNotificationId",
            "description": "<p>The id of the last notification seen by the client. Results <em>after</em> this notification will be returned, facilitating pagination.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>The notifications array, or a count</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200\n{\n  \"message\": \"Success\",\n  \"data\": \"<notifications>\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routers/user/router.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "403-Forbidden",
            "description": "<p>The user does not have the necessary permissions to perform this request.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"message\": \"Access denied\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/user/login",
    "title": "Login",
    "name": "Login",
    "group": "User",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Body Parameters": [
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's unique username. (1-20 lowercase chars, no whitespace, not numeric, not one of 'me', 'orig', 'picture', 'cover')</p>"
          },
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password. (6-30 chars, no whitespace)</p>"
          }
        ]
      }
    },
    "filename": "./routers/user/router.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/:username/notifications",
    "title": "Mark All Notifications As Read",
    "name": "Mark_All_Notifications_As_Read",
    "description": "<p>Marks all received user notifications as read.</p>",
    "group": "User",
    "permission": [
      {
        "name": "self",
        "title": "Self access",
        "description": "<p>Only authenticated users can access themselves on this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's unique username.</p>"
          }
        ]
      }
    },
    "filename": "./routers/user/router.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "403-Forbidden",
            "description": "<p>The user does not have the necessary permissions to perform this request.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"message\": \"Access denied\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/:username/notifications/:notificationid",
    "title": "Mark notification",
    "name": "Mark_notification",
    "description": "<p>Mark notification as read/unread</p>",
    "group": "User",
    "permission": [
      {
        "name": "self",
        "title": "Self access",
        "description": "<p>Only authenticated users can access themselves on this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's unique username.</p>"
          },
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "notificationid",
            "description": "<p>Notification's unique ID.</p>"
          }
        ],
        "Body Parameters": [
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "unread",
            "description": "<p>Boolean indicating whether the notification should be marked as unread/read.</p>"
          }
        ]
      }
    },
    "filename": "./routers/user/router.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "403-Forbidden",
            "description": "<p>The user does not have the necessary permissions to perform this request.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"message\": \"Access denied\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/:username/reset-password/:token",
    "title": "Perform password reset",
    "name": "Perform_password_reset",
    "description": "<p>Reset a users password using a valid token obtained via a password reset email</p>",
    "group": "User",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's unique username.</p>"
          },
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Valid password reset token</p>"
          }
        ],
        "Body Parameters": [
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The new password for the user</p>"
          }
        ]
      }
    },
    "filename": "./routers/user/router.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:username/reset-password",
    "title": "Request password reset",
    "name": "Request_password_reset",
    "description": "<p>Request a password reset link to the users inbox</p>",
    "group": "User",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's unique username.</p>"
          }
        ]
      }
    },
    "filename": "./routers/user/router.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:username/reverify",
    "title": "Resend a user verification email",
    "name": "Resend_a_user_verification_email",
    "description": "<p>Request a new verification email to be sent to the users inbox</p>",
    "group": "User",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's unique username.</p>"
          }
        ]
      }
    },
    "filename": "./routers/user/router.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/user",
    "title": "Sign up",
    "name": "Sign_up",
    "group": "User",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Body Parameters": [
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email.</p>"
          },
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>User's first name. (2-30 chars, no whitespace)</p>"
          },
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password. (6-30 chars, no whitespace)</p>"
          },
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's unique username. (1-20 lowercase chars, no whitespace, not numeric, not one of 'me', 'orig', 'picture', 'cover')</p>"
          }
        ]
      }
    },
    "filename": "./routers/user/router.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/:username/notifications",
    "title": "Subscribe to Notifications",
    "name": "Subscribe_to_Notifications",
    "description": "<p>Subscribe the user to receive real-time notifications using Web Sockets.</p>",
    "group": "User",
    "permission": [
      {
        "name": "self",
        "title": "Self access",
        "description": "<p>Only authenticated users can access themselves on this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's unique username.</p>"
          },
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "socketID",
            "description": "<p>User's unique web socket ID (provided by Socket.io)</p>"
          }
        ]
      }
    },
    "filename": "./routers/user/router.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "403-Forbidden",
            "description": "<p>The user does not have the necessary permissions to perform this request.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"message\": \"Access denied\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/:username/branches/followed",
    "title": "Unfollow a branch",
    "name": "Unfollow_a_branch",
    "description": "<p>Unfollow a branch</p>",
    "group": "User",
    "permission": [
      {
        "name": "self",
        "title": "Self access",
        "description": "<p>Only authenticated users can access themselves on this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's unique username.</p>"
          }
        ],
        "Query Parameters": [
          {
            "group": "Query Parameters",
            "type": "String",
            "optional": false,
            "field": "branchid",
            "description": "<p>The id of the branch to stop following</p>"
          }
        ]
      }
    },
    "filename": "./routers/user/router.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/:username/notifications",
    "title": "Unsubscribe from Notifications",
    "name": "Unsubscribe_from_Notifications",
    "description": "<p>Unsubscribe the user from receiving real-time notifications using Web Sockets.</p>",
    "group": "User",
    "permission": [
      {
        "name": "self",
        "title": "Self access",
        "description": "<p>Only authenticated users can access themselves on this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's unique username.</p>"
          }
        ]
      }
    },
    "filename": "./routers/user/router.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "403-Forbidden",
            "description": "<p>The user does not have the necessary permissions to perform this request.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"message\": \"Access denied\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/user/me",
    "title": "Update Self",
    "name": "Update_Self",
    "group": "User",
    "permission": [
      {
        "name": "self",
        "title": "Self access",
        "description": "<p>Only authenticated users can access themselves on this route.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Body Parameters": [
          {
            "group": "Body Parameters",
            "type": "Number",
            "optional": false,
            "field": "dob",
            "description": "<p>User's new date of birth (UNIX timestamp). [optional]</p>"
          },
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's new email. [optional]</p>"
          },
          {
            "group": "Body Parameters",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's new name. (2-30 chars, no whitespace) [optional]</p>"
          }
        ]
      }
    },
    "filename": "./routers/user/router.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "403-Forbidden",
            "description": "<p>The user does not have the necessary permissions to perform this request.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"message\": \"Access denied\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:username/verify/:token",
    "title": "Verify a user",
    "name": "Verify_a_user",
    "description": "<p>Verify a user using a valid token from a verification email sent to their inbox</p>",
    "group": "User",
    "permission": [
      {
        "name": "guest",
        "title": "Guest access",
        "description": "<p>Anyone can access this route, without authentication.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's unique username.</p>"
          }
        ]
      }
    },
    "filename": "./routers/user/router.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "400-BadRequest",
            "description": "<p>The server could not process the request due to missing or invalid parameters.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          },
          {
            "group": "Errors",
            "optional": false,
            "field": "404-NotFound",
            "description": "<p>The requested resource couldn't be found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 BadRequest\n{\n  \"message\": \"Description of invalid parameter\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        },
        {
          "title": "Not Found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"The requested resource couldn't be found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/user/logout",
    "title": "Logout",
    "name": "Logout",
    "group": "guest",
    "version": "1.0.0",
    "filename": "./routers/user/router.js",
    "groupTitle": "Guest access",
    "groupDescription": "<p>Anyone can access this route, without authentication.</p>",
    "error": {
      "fields": {
        "Successes": [
          {
            "group": "Successes",
            "optional": false,
            "field": "200-OK",
            "description": "<p>The server successfully carried out the request.</p>"
          }
        ],
        "Errors": [
          {
            "group": "Errors",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>The server was unable to carry out the request due to an internal error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Success\"\n}",
          "type": "json"
        },
        {
          "title": "InternalServerError:",
          "content": "HTTP/1.1 500 InternalServerError\n{\n  \"message\": \"Something went wrong. We're looking into it.\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });