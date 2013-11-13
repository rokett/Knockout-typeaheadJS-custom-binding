/**
 * Custom Knockout binding handler for dealing with the Twitter typeahead plugin (https://github.com/twitter/typeahead.js)
 *
 * Usage
 * Create an options object within your viewmodel containing the typeahead.js options (name, prefetch, remote, minLength).
 *
 * Add data-bind="typeaheadJS: options, id: userID" to the input field.  Options is the object from your
 * viewmodel containing the typeahead.js options.  UserID is an observable and is referenced by the id binding.
 *
 * When selecting an entry from the typeahead.js suggestion, UserID will be populated with the id of the selected entry.
 *
 * Twitter's typeahead.js requires jQuery 1.9+
 */
ko.bindingHandlers.typeaheadJS = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var el = $(element);
        var options = ko.utils.unwrapObservable(valueAccessor());
        var allBindings = allBindingsAccessor();

        el.attr("autocomplete", "off").typeahead({
            name: options.name,
            prefetch: options.prefetch,
            remote: options.remote,
            minLength: options.minLength
        }).on('typeahead:selected', function(obj, datum) {
            allBindings.id(datum.id);
        });
    }
};
