Built an app similar to this, for a client. The code here is copyright-free and can be modified in any way.

A cool application that :- 
  - Utillizes APIs provided by San Francisco's transit system- Bay Area Rapid Transit(http://bart.gov/schedules/developers/),
  - Pulls relevant information(station geolocation, train arrivals/departures) and
  - Mashes them up with a Google Map application.

P.S:- Although I had the XML formatted Station & Route information(Station.xml,routes.xml) provided by BART, 
I nonetheless ported all that data(using port.php) to a SQLite3 database(bart.db).
Q>Why did I do that extra thing?

      - Cause SQLite3 is cool and I wanted to learn it and this app was the best oppurtunity for me ^_^ !!
      - Doesn't require too much overhead.
      - Since the relevant data doesn't follow a tree structured model, all of the XPath stuff(with its easy querying) wasn't that neccessary.
      - SQLite3 is going to be faster than XML since indexing is part of the database, although that is not a tried and tested fact.
      - And again I really wanted to get my hands dirty with sqlite.
