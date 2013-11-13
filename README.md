#Knockout typeahead.js custom binding

Custom binding for Twitter's typeahead.js (http://twitter.github.io/typeahead.js/)

##Pre-requisites
1. jQuery 1.9+ (typeahead.js requires this)
2. typeahead.js
3. Knockout
4. typeahead.js custom binding (this file)

Load these scripts into your HTML file in the following order:

    <script src="includes/js/jquery-1.9.1.min.js"></script>
    <script src="includes/js/typeahead.min.js"></script>
    <script src="includes/js/knockout-3.0.0.js"></script>
    <script src="includes/js/knockout.bindings.typeahead.js"></script>

**Note:** If you're using Twitter Bootstrap 3 see the notes at https://github.com/twitter/typeahead.js#bootstrap-integration which explain how to use typeahead.js.  You need to load an additional CSS file in order to ensure that the typeahead.js CSS is displayed correctly.  The code to load the CSS files is as follows:

    <link rel="stylesheet" href="includes/css/bootstrap.min.css" media="screen" />
    <link rel="stylesheet" href="includes/css/typeahead.js-bootstrap.css" media="screen" />

##How do I use it?
The custom binding relies on an options object being created which defines the typeahead.js settings.  To get the selected data, you also need an observable to put that data into.

An example viewModel is as follows:

    var viewModel = function() {
        var self = this;

        self.employeeID= ko.observable();

        self.typeaheadOptions = {
            name: 'test',
            minLength: 0,
            prefetch: {
                url: 'http://api.example.com/employees',
                ttl: 1,
                filter: function(parsedResponse) {
                    var dataset = [];
                    for (var key in parsedResponse) {
                        dataset.push({
                            id: parsedResponse[key].id,
                            value: parsedResponse[key].firstName + ' ' + parsedResponse[key].surname,
                            tokens: [parsedResponse[key].firstName, parsedResponse[key].surname]
                        });
                    }
                    return dataset;
                }
            },
            remote: {
                url: 'http://api.example.com/employees?q=name:%QUERY',
                filter: function(parsedResponse) {
                    var dataset = [];
                    for (var key in parsedResponse) {
                        dataset.push({
                            value: parsedResponse[key].firstName + ' ' + parsedResponse[key].surname,
                            tokens: [parsedResponse[key].firstName, parsedResponse[key].surname]
                        });
                    }
                    return dataset;
                }
            }
        };
    };

In this example we have given the typeahead field the name *test*, a minimum length of 0 to ensure that it starts suggesting options as soon as we begin typing, a prefetch dataset, and a remote dataset.

### Datasets
In this example, both the *prefetch* and *remote* datasets return JSON objects in the following format:

    [
        {
            "id": 1,
            "firstName": "Fred",
            "surname": "Flinstone"
        },
        {
            "id": 2,
            "firstName": "Barney",
            "surname": "Rubble"
        }
    ]

They are run through a filter to extract the *firstName* and *surname* into the value and tokens for the dataset, and the *id* is passed into the *id* key.

###Data Binding
Your input field should look similar to the following (the important bit being the *data-bind* attribute of course):

    <input type="text" class="form-control" data-bind="typeaheadJS: typeaheadOpts, id: employeeID" name="employee" id="employee" placeholder="Enter the name of the employee…" />

To the *typeaheadJS* binding we pass the *typeaheadOptions* options object.  To the *id* binding we pass the observable which we want to use to hold the selected value; in this case *employeeID*.
