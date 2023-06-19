# Leaflet Choropleth Map with Dropdown Selector

## Notes
1.  Starter code is Leaflet Day 2 Activity 4
  *  Note:  I do not like the code for this activity after I reviewed it.  Maybe it is okay but I like the simpler version found here:  [Choropleth](https://leafletjs.com/examples/choropleth/).  I modifed the file to use this code instead.
2. Remember to replace the leaflet key with your own in the config.js file.
1. Used geojson file from suicide project
1. Modified the geojson to include a year and a value to the proproperties in the geojson file.  
    * May not need to add this data; originally I was going to add one year's property data and then update it with a separate piece of code for a different year.  I think the method I used would allow for the geometry to be loaded and then a second call to bind the shape properties.
    * Note:  After playing with it I decided on file would work and all the suicide data could be placed into the properties area.  The modify_geojson notebook creates the entire file and I called it `allData.geojson`.  It's 23MB large so the geometry data needs reduced.  More about that later.
    * See jupyter notebooks in the python folder.  The order that they are run is as follows:
      * `modify_geojson.ipynb`
      * `create_sqlite_db.ipynb`
      * `add_data_to_sqlite.ipynb`
      * `query_sqlite_db.ipynb`  
      The modify notebook and sqlite notebooks generate files in the `data` subfolder of the same directory as the notebook.

        *I copied the db into the `static/data` folder*  
        *Remember to copy the modified geojson file into the html static/data folder.
1. Updated references in the starter code javascript file to only reference values from the new geojson file.
1. Verified that everything works by opening the index.html file in liveserver.
1. Create flask app by using Unit 10 Activity 3 Activity 10-Ins_Flask_with_ORM as an example
1. Move the app.py file to the top of the repo directory
1. Create `templates` folder at the same level 
1. Move the index.html file into the templates folder
1. Comment out code in app.py that does not apply to only flask
1. Add `render_template()` to first route return.  Comment out all other routes.
1. Check that the webpage works by running the app.py file and checking `localhost:5000`
1. In the `index.html` file, add a title and create a dropdown.  We will have a dropdown of only 2019, 2020 data.  *Note*: I expanded this to 2017, 2018, 2019, 2020 data (see modify jupyter notebook).  The dropdown will need an `id` that the javascript will reference when getting the `value` from the selected `option`
1. Add `.container{margin:20px, padding: 10px}` to the css so the spacing can be modified.  Add this class to the title div and the selector div.  Leave the myMap div alone since it looks nice spanning the page.
1. Create a sqlite database for the data - use starter code from https://www.sqlitetutorial.net/sqlite-python/creating-database/ - sample code called `modify_json.ipynb`
1. Create sqlite database tables - use starter code from https://www.sqlitetutorial.net/sqlite-python/create-tables/ - sample code called `create_sqlite_db.ipynb`
    * Note: I don't like my schema of this draft.  I don't really want two columns with each column being a year.  I should restructure it to be `country, year, suicides` as the columns.  This will be easier to make queries that use the year as a filter.
    * Note:  I left this database entry in here but I am not technically using any of the db-based routes but the db and route are still useable.  
1. Check db size to see if it went from ~0kb to a small file size
1. Add data to sqlite database - use starter code from https://www.sqlitetutorial.net/sqlite-python/insert/ - sample code called `add_data_to_sqlite_db.ipynb`
    * Again, instead of merging the data I could have concatenated or joined the tables
1. Test queries - use starter code from https://www.sqlitetutorial.net/sqlite-python/sqlite-python-select/ - sample code called `query_sqlite_db.ipynb`
    * Relized potential issue with my schema, added notes above but moving forward and will only correct if I have time.
1.  Create simple route that returns all the data in json in the app.py file.
    * This is where I would feed a keyword like `year` into the route (url ie `<year>`) and use that in my database query as a filter to simplify the javascript code.  I'm not going to change these routes until I have a need for them.  These are just sample routes.
1.  Test the query in the javascript by doing a console.log with a d3.json('route path').then(function(data){console.log(data)};  See first couple lines of data.
1.  For the sake of ease - put all data into a variable in the logic.js.  I use `populateData` as my list and modify my previous console log.
  * Note:  I got rid of this code because it was not needed.  I found a better way of adding data to leaflet.  See below.
1. Test to see what it looks like when console.logged.
1. Double check that the exising code markers for one year still work.
1. Add an object selection of the dropdown (using the dropdown id)
1. Add an event listener that looks for a `change` in the dropdown and then calls a function with inputs of the selector being the dropdown value and the layer.  This function then checks the selection.  This code is at the very top of the page.
1. Check that map is working
    * Note: I did lots of console logs and tests on this part to get it to work. I stopped at this point after 3 hours of working on it and came back the next day and found this solution after testing 3-4 different ways (2 hours).  The code in this repo was updated 2-3 times to make things work better and improve the coding techniques.
1.  One thing I figured out is that in my event listener, I can watch for changes of the drop down and when I change occurs, I run a function called `selectDataSource` the restyles and updates the dropdown boxes.  Everything else in the code remains essentially the same as if it was just one year's worth of data instead of 4 years.  The key is that I can access the layers and mofidy them by calling `.eachLayer()` on the geojson group layer.
1.  Tested:  Everything works.  Now I should reduce the size of the orignial geojson file.  It was about 21MB and I would like it smaller.
1. Reduce geojson file size with https://www.statsilk.com/maps/simplify-map-reducing-file-size-and-loading-time 
    * import the json file, then click simplify - mark maintain shapes
    * modify the degree of resolution as desired.
    * export - I saved over my original file of 21MB and this one is about 1.6MB and still has good resolution.
1.  Tested everything again and it works fine.
1.  Reduced it again to to a file size of about 500kb.
1.  Noticed that the map extends past the bottom of the screen on loading so I changed the css .map{} to calculate the div's height by suptracking 200px.  Not it seems to load fine but this will not work on all screens since I need to do it by a percent of height instead of pixels.

