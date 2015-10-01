Naming Database elements:
Before you start working with databases,
you have to identify your needs. The
purpose of the application (or Web site,
in this case) dictates how the database
should be designed. With that in mind,
the examples in this chapter and the next
will use a database that stores some user
registration information.
When creating databases and tables, you
should come up with names (formally called
identifiers) that are clear, meaningful, and
easy to type. Also, identifiers
n	 Should only contain letters, numbers,
and the underscore (no spaces)
n	 Should not be the same as an existing
keyword (like an SQL term or a function
name)
n	 Should be treated as case-sensitive
n	 Cannot be longer than 64 characters
(approximately)
n	 Must be unique within its realm
This last rule means that a table cannot
have two columns with the same name and
a database cannot have two tables with
the same name. You can, however, use the
same column name in two different tables
in the same database (in fact, you often will
do this). As for the first three rules, I use the
word should, as these are good policies
more than exact requirements. Exceptions
can be made to these rules, but the syntax
for doing so can be complicated. Abiding
by these suggestions is a reasonable
limitation and will help avoid complications
EXAMPLE:
TABLe 4.1 users Table
Column Name 			Example
user_id 				834
first_name 				Larry
last_name 				David
email 					ld@example.com
pass 					emily07
registration_date 		2011-03-31 19:21:03

CHECK OUT MYSQL DATA TYPES(See dataTypes.png)

CHAR vs. VARCHAR:
Both of these types store strings and
can be set with a maximum length. The
primary difference between the two
is that anything stored as a CHAR will
always be stored as a string the length
of the column (using spaces to pad it;
these spaces will be removed when
you retrieve the stored value from the
database). Conversely, strings stored
in a VARCHAR column will require only
as much space as the string itself. So
the word cat in a VARCHAR(10) column
requires 4 bytes of space (the length
of the string plus 1), but in a CHAR(10)
column, that same word requires 10 bytes
of space. Hence, generally speaking,
VARCHAR columns tend to require less
disk space than CHAR columns.
However, databases are normally faster
when working with fixed-size columns,
which is an argument in favor of CHAR.
And that same three-letter word—cat—
in a CHAR(3) only uses 3 bytes but in a
VARCHAR(10) requires 4. So how do you
decide which to use?
If a string field will always be of a
set length (e.g., a state abbreviation),
use CHAR; otherwise, use VARCHAR.
You may notice, though, that in some
cases MySQL defines a column as the
one type (like CHAR) even though you
created it as the other (VARCHAR). This is
perfectly normal and is MySQL’s way of
improving performance.

To use phpMyAdmin:
1. Access phpMyAdmin through your
Web browser H.
The URL you use will depend upon
your situation. If running on your
own computer, this might be http://
localhost/phpMyAdmin/. If running
on a hosted site, your Web host will
provide you with the proper URL. In
all likelihood, phpMyAdmin would be 
available through the site’s control
panel (should one exist).
Note that phpMyAdmin will only work if
it’s been properly configured to connect
to MySQL with a valid username/
password/hostname combination. If
you see a message like the one in I,
you’re probably not using the correct
values
2. If possible and necessary, use the list on
the left to select a database to use J.
What options you have here will
vary depending upon what MySQL
user phpMyAdmin is connecting as.
That user might have access to one
database, several databases, or every
database. On a hosted site where you
have just one database, that database
will probably already be selected
for you. On your own computer, with
phpMyAdmin connecting as the MySQL
root user, you would see a pull-down
menu or a simple list of available
databasesJ.
3. Click on a table name in the left column
to select that table K.
You don’t always have to select a
table—in fact you never will if you just
use the SQL commands in this book, but
doing so can often simplify some tasks.
4. Use the tabs and links (on the right side
of the page) to perform common tasks.
For the most part, the tabs and links are
shortcuts to common SQL commands.
For example, the Browse tab performs a
SELECT query and the Insert tab creates
a form for adding new records.
5. Use the SQL tab L or the SQL query
window M to enter SQL commands.
The next three chapters, and a couple
more later in the book, will provide SQL
commands that must be run to create,
populate, and manipulate tables. These
might look like
INSERT INTO tablename (col1, col2)
➝ VALUES (x, y)
These commands can be run using
the mysql client, phpMyAdmin, or any
other interface. To run them within
phpMyAdmin, just enter them into one
of the SQL prompts and click Go