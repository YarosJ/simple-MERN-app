define({ "api": [
  {
    "type": "post",
    "url": "/login",
    "title": "Log in user (return access and refresh JWT)",
    "name": "Login",
    "group": "Authentication",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Can be anything but not empty.</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"email\": \"example@ex.com\",\n \"password\": \"1111111\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "acessToken",
            "description": "<p>Should be stored, for example, in local storage.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "refereshToken",
            "description": "<p>Should use to access resources.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200 OK\n{\n  \"accessToken\": \"<JWT>\",\n  \"refreshToken\": \"<JWT>\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "IncorrectEmail",
            "description": "<p>Incorrect email.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "IncorrectPassword",
            "description": "<p>Incorrect password.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "IncorrectEmail:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"message\": \"Incorrect email.\"\n}",
          "type": "json"
        },
        {
          "title": "IncorrectPassword:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"message\": \"Incorrect password.\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n \"message\": \"<Error>\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/authentication.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/refresh",
    "title": "Refresh access token (by refresh token)",
    "name": "Refresh",
    "group": "Authentication",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Refresh token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>New access token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200 OK\n{\n  \"accessToken\": \"<JWT>\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TokenExpiredError",
            "description": "<p>JSON web token expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JsonWebTokenError",
            "description": "<p>Invalid token or token must be provided.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n \"message\": \"<Error>\"\n}",
          "type": "json"
        },
        {
          "title": "TokenExpiredError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"name\": \"TokenExpiredError\",\n \"message\": \"jwt expired\",\n \"expiredAt\": \"2018-07-03T17:39:59.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "JsonWebTokenError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"name\": \"JsonWebTokenError\",\n  \"message\": \"jwt must be provided\"\n}",
          "type": "json"
        },
        {
          "title": "JsonWebTokenError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"name\": \"JsonWebTokenError\",\n   \"message\": \"invalid token\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"Server error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/authentication.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/role",
    "title": "Add resource and permissions to role",
    "name": "Create",
    "group": "Roles",
    "version": "1.0.0",
    "permission": [
      {
        "name": "depends on the permissions settings in the admin."
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"role\": \"guest\",\n \"resource\": \"testResource\",\n \"permission\": [\"POST\",\"DELETE\"]\n}",
          "type": "String"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User",
            "description": "<p>New user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200 OK\n{\n  \"role\": \"guest\",\n  \"resource\": \"testResource\",\n  \"permission\": [\n      \"POST\",\n      \"DELETE\"\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Invalid data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TokenExpiredError",
            "description": "<p>JSON web token expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JsonWebTokenError",
            "description": "<p>Invalid token or token must be provided.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ValidationError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"message\": \"Empty field is not allowed\"\n}",
          "type": "json"
        },
        {
          "title": "TokenExpiredError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"name\": \"TokenExpiredError\",\n \"message\": \"jwt expired\",\n \"expiredAt\": \"2018-07-03T17:39:59.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "JsonWebTokenError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"name\": \"JsonWebTokenError\",\n  \"message\": \"jwt must be provided\"\n}",
          "type": "json"
        },
        {
          "title": "JsonWebTokenError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"name\": \"JsonWebTokenError\",\n   \"message\": \"invalid token\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"Server error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/roles.js",
    "groupTitle": "Roles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Access JSON web token.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/roles/:role/resources/:resource/permissions/:permission",
    "title": "Delete permission from role resource",
    "name": "Delete",
    "group": "Roles",
    "version": "1.0.0",
    "permission": [
      {
        "name": "depends on the permissions settings in the admin."
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>role.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "resource",
            "description": "<p>resource.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "permission",
            "description": "<p>permission.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SuccessResponse",
            "description": "<p>Success message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200 OK\n{\n \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>role resource or permission in params doesn't exist.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TokenExpiredError",
            "description": "<p>JSON web token expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JsonWebTokenError",
            "description": "<p>Invalid token or token must be provided.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n \"message\": \"Resource not found\"\n}",
          "type": "json"
        },
        {
          "title": "TokenExpiredError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"name\": \"TokenExpiredError\",\n \"message\": \"jwt expired\",\n \"expiredAt\": \"2018-07-03T17:39:59.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "JsonWebTokenError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"name\": \"JsonWebTokenError\",\n  \"message\": \"jwt must be provided\"\n}",
          "type": "json"
        },
        {
          "title": "JsonWebTokenError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"name\": \"JsonWebTokenError\",\n   \"message\": \"invalid token\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"Server error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/roles.js",
    "groupTitle": "Roles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Access JSON web token.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/roles/:role/permissions",
    "title": "Get permissions of role",
    "name": "Get",
    "group": "Roles",
    "version": "1.0.0",
    "permission": [
      {
        "name": "depends on the permissions settings in the admin."
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Permissions",
            "description": "<p>Permissions list of Role.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": " HTTP/1.1 200 OK\n{\n  \"/roles/\": [\n      \"GET\"\n  ],\n  \"/users/\": [\n      \"GET\"\n  ],\n  \"test\": [\n      \"POST\",\n      \"DELETE\"\n  ],\n  \"/testimonials/\": [\n      \"GET\"\n  ],\n  \"/\": [\n      \"GET\"\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/roles.js",
    "groupTitle": "Roles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Access JSON web token.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TokenExpiredError",
            "description": "<p>JSON web token expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JsonWebTokenError",
            "description": "<p>Invalid token or token must be provided.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "TokenExpiredError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"name\": \"TokenExpiredError\",\n \"message\": \"jwt expired\",\n \"expiredAt\": \"2018-07-03T17:39:59.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "JsonWebTokenError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"name\": \"JsonWebTokenError\",\n  \"message\": \"jwt must be provided\"\n}",
          "type": "json"
        },
        {
          "title": "JsonWebTokenError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"name\": \"JsonWebTokenError\",\n   \"message\": \"invalid token\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"Server error\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/roles",
    "title": "Get all roles",
    "name": "List",
    "group": "Roles",
    "version": "1.0.0",
    "permission": [
      {
        "name": "depends on the permissions settings in the admin."
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Roles",
            "description": "<p>List of all roles.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n     \"key\": \"guest\"\n  },\n  {\n     \"key\": \"superAdmin\"\n  },\n  {\n     \"key\": \"user\"\n  },\n  {\n     \"key\": \"admin\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "routes/roles.js",
    "groupTitle": "Roles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Access JSON web token.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TokenExpiredError",
            "description": "<p>JSON web token expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JsonWebTokenError",
            "description": "<p>Invalid token or token must be provided.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "TokenExpiredError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"name\": \"TokenExpiredError\",\n \"message\": \"jwt expired\",\n \"expiredAt\": \"2018-07-03T17:39:59.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "JsonWebTokenError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"name\": \"JsonWebTokenError\",\n  \"message\": \"jwt must be provided\"\n}",
          "type": "json"
        },
        {
          "title": "JsonWebTokenError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"name\": \"JsonWebTokenError\",\n   \"message\": \"invalid token\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"Server error\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/testimonials",
    "title": "Create new testimonial",
    "name": "Create",
    "group": "Testimonials",
    "version": "1.0.0",
    "permission": [
      {
        "name": "depends on the permissions settings in the admin."
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"title\": \"Test title\",\n \"body\": \"Test body\",\n \"autor\": \"Test autor\",\n \"gender\": \"male\"\n}",
          "type": "String"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Testimonials",
            "description": "<p>New testimonial.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 201 OK\n{\n \"__v\": 0,\n \"title\": \"Test title\",\n \"body\": \"Test body\",\n \"autor\": \"Test autor\",\n \"createdAt\": \"2018-07-07T13:29:38.386Z\",\n \"_id\": \"5b40c0420d9d33574231ffc4\",\n \"gender\": \"male\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Invalid data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TokenExpiredError",
            "description": "<p>JSON web token expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JsonWebTokenError",
            "description": "<p>Invalid token or token must be provided.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ValidationError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"message\": \"Testimonial validation failed: title: Path `title` is required.\"\n}",
          "type": "json"
        },
        {
          "title": "TokenExpiredError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"name\": \"TokenExpiredError\",\n \"message\": \"jwt expired\",\n \"expiredAt\": \"2018-07-03T17:39:59.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "JsonWebTokenError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"name\": \"JsonWebTokenError\",\n  \"message\": \"jwt must be provided\"\n}",
          "type": "json"
        },
        {
          "title": "JsonWebTokenError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"name\": \"JsonWebTokenError\",\n   \"message\": \"invalid token\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"Server error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/testimonials.js",
    "groupTitle": "Testimonials",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Access JSON web token.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/testimonials/:id",
    "title": "Delete testimonial",
    "name": "Delete",
    "group": "Testimonials",
    "version": "1.0.0",
    "permission": [
      {
        "name": "depends on the permissions settings in the admin."
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of testimonial.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SuccessResponse",
            "description": "<p>Success message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200 OK\n{\n \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>testimonial by this id doesn't exist.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TokenExpiredError",
            "description": "<p>JSON web token expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JsonWebTokenError",
            "description": "<p>Invalid token or token must be provided.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n \"message\": \"Testimonial by this id doesn't exist\"\n}",
          "type": "json"
        },
        {
          "title": "TokenExpiredError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"name\": \"TokenExpiredError\",\n \"message\": \"jwt expired\",\n \"expiredAt\": \"2018-07-03T17:39:59.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "JsonWebTokenError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"name\": \"JsonWebTokenError\",\n  \"message\": \"jwt must be provided\"\n}",
          "type": "json"
        },
        {
          "title": "JsonWebTokenError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"name\": \"JsonWebTokenError\",\n   \"message\": \"invalid token\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"Server error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/testimonials.js",
    "groupTitle": "Testimonials",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Access JSON web token.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/testimonials",
    "title": "Get all testimonials",
    "name": "List",
    "group": "Testimonials",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Testimonials",
            "description": "<p>List of all testimonials.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 201 OK\n[\n   {\n      \"_id\": \"5b387a7709f05514c72bc439\",\n      \"title\": \"cbv2\",\n      \"body\": \"bcbc\",\n      \"autor\": \"bcbc\",\n      \"createdAt\": \"2018-07-01T06:53:43.069Z\",\n      \"gender\": \"male\"\n   },\n   {\n      \"_id\": \"5b3b415260426d2468572bf8\",\n      \"title\": \"xxx\",\n      \"body\": \"xcvx\",\n      \"autor\": \"xcvv\",\n      \"createdAt\": \"2018-07-03T09:26:42.893Z\",\n      \"gender\": \"male\"\n   },\n]",
          "type": "json"
        }
      ]
    },
    "filename": "routes/testimonials.js",
    "groupTitle": "Testimonials",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"Server error\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/testimonials/:id",
    "title": "Update testimonial",
    "name": "Update",
    "group": "Testimonials",
    "version": "1.0.0",
    "permission": [
      {
        "name": "depends on the permissions settings in the admin."
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of testimonial.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"title\": \"Updated test title\",\n \"gender\": \"female\"\n}",
          "type": "String"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Testimonial",
            "description": "<p>Updated testimonial.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200 OK\n{\n \"_id\": \"5b40c0420d9d33574231ffc4\",\n \"title\": \"Updated test title\",\n \"body\": \"sdfsdf sfdgds\",\n \"autor\": \"ASDF\",\n \"createdAt\": \"2018-07-07T13:29:38.386Z\",\n \"__v\": 0,\n \"gender\": \"female\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Testimonial by this id doesn't exist.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TokenExpiredError",
            "description": "<p>JSON web token expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JsonWebTokenError",
            "description": "<p>Invalid token or token must be provided.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n \"message\": \"Testimonial by this id doesn't exist\"\n}",
          "type": "json"
        },
        {
          "title": "TokenExpiredError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"name\": \"TokenExpiredError\",\n \"message\": \"jwt expired\",\n \"expiredAt\": \"2018-07-03T17:39:59.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "JsonWebTokenError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"name\": \"JsonWebTokenError\",\n  \"message\": \"jwt must be provided\"\n}",
          "type": "json"
        },
        {
          "title": "JsonWebTokenError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"name\": \"JsonWebTokenError\",\n   \"message\": \"invalid token\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"Server error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/testimonials.js",
    "groupTitle": "Testimonials",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Access JSON web token.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create new user",
    "name": "Create",
    "group": "Users",
    "version": "1.0.0",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"email\": \"example@ex.com\",\n \"password\": \"1111111\"\n}",
          "type": "String"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User",
            "description": "<p>New user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 201 OK\n{\n \"email\": \"example@ex.com\",\n \"role\": \"user\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ConflictEmail",
            "description": "<p>Already exist.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Invalid data.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ConflictEmail:",
          "content": "HTTP/1.1 409 Conflict\n{\n \"message\": \"This user is already exist\"\n}",
          "type": "json"
        },
        {
          "title": "ValidationError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"message\": \"User validation failed: email: Path `email` is required.\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"Server error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete user",
    "name": "Delete",
    "group": "Users",
    "version": "1.0.0",
    "permission": [
      {
        "name": "depends on the permissions settings in the admin."
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SuccessResponse",
            "description": "<p>Success message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200 OK\n{\n \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User by this id is not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Not allowed delete SuperAdmin.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TokenExpiredError",
            "description": "<p>JSON web token expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JsonWebTokenError",
            "description": "<p>Invalid token or token must be provided.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n \"message\": \"This user is not found\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n \"message\": \"SuperAdmin can't be deleted\"\n}",
          "type": "json"
        },
        {
          "title": "TokenExpiredError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"name\": \"TokenExpiredError\",\n \"message\": \"jwt expired\",\n \"expiredAt\": \"2018-07-03T17:39:59.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "JsonWebTokenError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"name\": \"JsonWebTokenError\",\n  \"message\": \"jwt must be provided\"\n}",
          "type": "json"
        },
        {
          "title": "JsonWebTokenError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"name\": \"JsonWebTokenError\",\n   \"message\": \"invalid token\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"Server error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Access JSON web token.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Get all users",
    "name": "List",
    "group": "Users",
    "version": "1.0.0",
    "permission": [
      {
        "name": "depends on the permissions settings in the admin."
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Users",
            "description": "<p>List of all users.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 201 OK\n[\n  {\n    \"role\": \"superAdmin\",\n    \"createdAt\": \"2018-06-26T17:04:23.331Z\",\n    \"email\": \"admin@ex.com\",\n    \"_id\": \"5b3272178d585a42b2618b11\"\n  },\n  {\n    \"role\": \"superAdmin\",\n    \"createdAt\": \"2018-06-26T17:04:44.592Z\",\n    \"email\": \"user@ex.com\",\n    \"_id\": \"5b32722c8d585a42b2618b12\"\n  },\n  {\n    \"role\": \"admin\",\n    \"createdAt\": \"2018-07-01T13:38:12.085Z\",\n    \"email\": \"example@ex.com\",\n    \"_id\": \"5b38d9448deddc50abcc965f\"\n  },\n]",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Access JSON web token.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TokenExpiredError",
            "description": "<p>JSON web token expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JsonWebTokenError",
            "description": "<p>Invalid token or token must be provided.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "TokenExpiredError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"name\": \"TokenExpiredError\",\n \"message\": \"jwt expired\",\n \"expiredAt\": \"2018-07-03T17:39:59.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "JsonWebTokenError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"name\": \"JsonWebTokenError\",\n  \"message\": \"jwt must be provided\"\n}",
          "type": "json"
        },
        {
          "title": "JsonWebTokenError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"name\": \"JsonWebTokenError\",\n   \"message\": \"invalid token\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"Server error\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/users/:id",
    "title": "Update user",
    "name": "Update",
    "group": "Users",
    "version": "1.0.0",
    "permission": [
      {
        "name": "depends on the permissions settings in the admin."
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"email\": \"example@ex.com\",\n \"role\": \"user\"\n}",
          "type": "String"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User",
            "description": "<p>Updated user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SuccessResponse:",
          "content": "HTTP/1.1 200 OK\n{\n \"_id\": \"5b41de3a2623e02a4d3f4334\"\n \"email\": \"example@ex.com\",\n \"role\": \"user\"\n \"createdAt\": \"2018-07-08T09:49:46.359Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User by this id doesn't exist.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TokenExpiredError",
            "description": "<p>JSON web token expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JsonWebTokenError",
            "description": "<p>Invalid token or token must be provided.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n \"message\": \"This user is not found\"\n}",
          "type": "json"
        },
        {
          "title": "TokenExpiredError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"name\": \"TokenExpiredError\",\n \"message\": \"jwt expired\",\n \"expiredAt\": \"2018-07-03T17:39:59.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "JsonWebTokenError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"name\": \"JsonWebTokenError\",\n  \"message\": \"jwt must be provided\"\n}",
          "type": "json"
        },
        {
          "title": "JsonWebTokenError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"name\": \"JsonWebTokenError\",\n   \"message\": \"invalid token\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"Server error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Access JSON web token.</p>"
          }
        ]
      }
    }
  }
] });
