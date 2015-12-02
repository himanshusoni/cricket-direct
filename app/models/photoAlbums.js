exports.definition = {
    config: {
        URL : "http://query.yahooapis.com/v1/public/yql",  
        // debug: true,
        adapter: {
            type: "restapi",
            collection_name: "matches",
            idAttribute: "matchid"
        } ,
        //parentNode : "query.results.PhotoAlbum",
        parentNode : function(data){
            var photos = [];
            
            _.each(data.query.results.PhotoAlbum, function(item){
               if(photos.length > 10)
                return;
                
               photos = _.union(photos, item.Photos.Photo);
            });
            return photos;
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            // extended functions and properties go here
            
            // add matchVenueId and matchVenueContent
        });

        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            // extended functions and properties go here

            // For Backbone v1.1.2, uncomment the following to override the
            // fetch method to account for a breaking change in Backbone.
            /*
            fetch: function(options) {
                options = options ? _.clone(options) : {};
                options.reset = true;
                return Backbone.Collection.prototype.fetch.call(this, options);
            }
            */
        });

        return Collection;
    }
};