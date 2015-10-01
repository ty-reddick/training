Modifying the Template:
Since all of the pages in this chapter and
the next will be part of the same Web application,
it’ll be worthwhile to use a common
template system. Instead of creating a
new template from scratch, the layout from
“Creating Dynamic Web Sites,”
will be used again, with only a minor modification
to the header file’s navigation links
EXERCISE: header.php
1	 <!DOCTYPE	html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/	
	 xhtml1-strict.dtd">
2	 <html	xmlns="http://www.w3.org/1999/xhtml">
3	 <head>
4	 	 <title><?php	echo $page_title; ?></title>
5	 	 <link	rel="stylesheet" href="includes/style.css" type="text/css" media="screen" />
6	 	 <meta	http-equiv="content-type" content="text/html; charset=utf-8" />
7	 </head>
8	 <body>
9	 	 <div	id="header">
10	 	 	 <h1>Your Website</h1>
11	 	 	 <h2>catchy slogan...</h2>
12	 	 </div>
13	 	 <div id="navigation">
14	 	 	 <ul>
15 <li><a href="index.php">Home Page</a></li>
16 <li><a href="register.php">Register</a></li>
17 <li><a href="view_users.php">View Users</a></li>
18 <li><a href="password.php">Change Password</a></li>
19	 	 	 	 <li><a href="#">link five</a></li>
20	 	 	 </ul>
21	 	 </div>
22	 	 <div id="content"><!-- Start of the page-specific content. -->
23	 <!-- Script 9.1	-	header.html -->

Connecting to MySQL:
The first step for interacting with MySQL—
connecting to the server—requires the
appropriately named mysqli_connect()
function:
$dbc = mysqli_connect (hostname,
➝ username, password, db_name);
The first three arguments sent to the
function (hostname, username, and
password) are based upon the users
and privileges established within MySQL
(see Appendix A, “Installation,” for more
information). Commonly (but not always),
the host value will be localhost.
The fourth argument is the name of the
database to use. This is the equivalent
of saying USE databasename within the
mysql client.
If the connection was made, the $dbc
variable, short for database connection
(but you can use any name you want, of
course), will become a reference point
for all of your subsequent database
interactions. Most of the PHP functions for
working with MySQL will take this variable
as its first argument.
If a connection problem occurred, you
can call mysqli_connect_error(), which
returns the connection error message. It
takes no arguments, so would be called
using just mysqli_connect_error();
Once you’ve connected to the database,
you should set the encoding for the
interaction. You can do so (as of PHP 5.0.5)
with the mysqli_set_charset() function:
mysqli_set_charset($dbc, 'utf8');
The value used as the encoding—the
second argument—should match that
of your PHP scripts and the collation of
your database (see Chapter 6, “Database
Design,” for more on MySQL collations).
If you fail to do this, all data will be
transferred using the default character set,
which could cause problems.
To start using PHP with MySQL, let’s create
a special script that makes the connection.
Other PHP scripts that require a MySQL
connection can then include this file.
EXERCISE:
1	 <?php	#	Script 9.2	-	mysqli_connect.php
2	
3	 //	This	file contains the database access information.
4	 //	This	file also establishes	a	connection to MySQL,
5	 //	selects the database, and sets the encoding.
6	
7	 //	Set the database access information as constants:
8	 DEFINE	('DB_USER', 'username');
9	 DEFINE	('DB_PASSWORD', 'password');
10	 DEFINE ('DB_HOST', 'localhost');
11	 DEFINE ('DB_NAME', 'sitename');
12	
13	 // Make the connection:
14	 $dbc	=	@mysqli_connect (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) OR die ('Could not connect to
MySQL:	'	.	mysqli_connect_error( )	);
15	
16	 // Set the encoding...
17	 mysqli_set_charset($dbc, 'utf8');
?>

executing Simple Queries:
Once you have successfully connected
to and selected a database, you can start
executing queries. The queries can be as
basic as inserts, updates, and deletions
or as involved as complex joins returning
numerous rows. Regardless of the SQL
command type, the PHP function for
executing a query is mysqli_query():
result = mysqli_query(dbc, query);
The function takes the database
connection as its first argument and
the query itself as the second. Within
the context of a complete PHP script,
I normally assign the query to another
variable, called $query or just $q, so
running a query might look like
$r = mysqli_query($dbc, $q);
For simple queries like INSERT, UPDATE,
DELETE, etc. (which do not return records),
the $r variable—short for result—will be
either TRUE or FALSE, depending upon
whether the query executed successfully
EXERCISE:
1	 <?php	#	Script 9.3	-	register.php
2	 //	This	script performs an INSERT query to add	a	record to the users table.
3	
4	 $page_title	=	'Register';
5	 include	('includes/header.html');
6	
7	 //	Check for form submission:
8	 if	($_SERVER['REQUEST_METHOD']	==	'POST')	{
9	
10	 	 $errors	=	array( ); // Initialize an error array.
11	 	
12	 	 // Check for	a	first name:
13	 	 if (empty($_POST['first_name']))	{
14	 	 	 $errors[]	=	'You forgot to enter your first name.';
15	 	 } else	{
16	 	 	 $fn	=	trim($_POST['first_name']);
17	 	 }
18	 	
19	 	 // Check for	a	last name:
20	 	 if (empty($_POST['last_name']))	{
21	 	 	 $errors[]	=	'You forgot to enter your last name.';
22	 	 } else	{
23	 	 	 $ln	=	trim($_POST['last_name']);
24	 	 }
25	
26	 	 // Check for an email address:
27	 	 if (empty($_POST['email']))	{
28	 	 	 $errors[]	=	'You forgot to enter your email address.';
29	 	 } else	{
30	 	 	 $e	=	trim($_POST['email']);
31	 	 }
32	 	
33	 	 // Check for	a	password and match against the confirmed password:
34	 	 if (!empty($_POST['pass1']))	{
35	 	 	 if ($_POST['pass1'] != $_POST['pass2'])	{
36	 	 	 	 $errors[]	=	'Your password did not match the confirmed password.';
37	 	 	 } else	{
38	 	 	 	 $p	=	trim($_POST['pass1']);
39	 	 	 }
40	 	 } else	{
41	 	 	 $errors[]	=	'You forgot to enter your password.';
42	 	 }
43	 	
44	 	 if (empty($errors))	{	// If everything's	OK.
45	 	
46	 	 	 // Register the user in the database...
47	 	 	
48	 	 	 require ('../mysqli_connect.php'); // Connect to the db.
49	
50	 	 	 // Make the query:
51	 	 	 $q	=	"INSERT INTO users (first_name, last_name, email, pass, registration_date) VALUES
('$fn', '$ln', '$e', SHA1('$p'), NOW( )	)";
52	 	 	 $r	=	@mysqli_query ($dbc, $q); // Run the query.
53	 	 	 if ($r)	{	// If it ran	OK.
54	
55	 	 	 	 // Print	a	message:
56	 	 	 	 echo '<h1>Thank you!</h1>
57	 	 	 <p>You are now registered. In Chapter 12 you will actually be able to log in!</p><p>	
	 	 	 <br /></p>';	
58	
59	 	 	 } else	{	// If it did not run	OK.
60	 	
61	 	 	 	 // Public message:
62	 	 	 	 echo '<h1>System Error</h1>
63	 	 	 	 <p class="error">You could not be registered due to	a	system error. We apologize for
any inconvenience.</p>';
64	 	
65	 	 	 	 // Debugging message:
66	 	 	 	 echo '<p>'	.	mysqli_error($dbc)	.	'<br /><br />Query:	'	.	$q	.	'</p>';
67	 	 	 	 	
68	 	 	 } // End of if ($r) IF.
69	 	 	
70	 	 	 mysqli_close($dbc); // Close the database connection.
71	 	 	
72	 	 	 // Include the footer and quit the script:
73	 	 	 include ('includes/footer.html');
74	 	 	 exit( );
75	 	 	
76	 	 } else	{	// Report the errors.
77	 	
78	 	 	 echo '<h1>Error!</h1>
79	 	 	 <p class="error">The following error(s) occurred:<br />';
80	 	 	 foreach ($errors as $msg)	{	// Print each error.
81	 	 	 	 echo	"	-	$msg<br />\n";
82	 	 	 }
83	 	 	 echo '</p><p>Please try again.</p><p><br /></p>';
84	 	 	
85	 	 } // End of if (empty($errors)) IF.
86	
87	 } // End of the main Submit conditional.
88	 ?>
89	 <h1>Register</h1>
90	 <form action="register.php" method="post">
91	 	 <p>First Name: <input type="text" name="first_name" size="15" maxlength="20" value="<?php if
(isset($_POST['first_name'])) echo $_POST['first_name']; ?>" /></p>
92	 	 <p>Last Name: <input type="text" name="last_name" size="15" maxlength="40" value="<?php if
(isset($_POST['last_name'])) echo $_POST['last_name']; ?>" /></p>
93	 	 <p>Email Address: <input type="text" name="email" size="20" maxlength="60" value="<?php if
(isset($_POST['email'])) echo $_POST['email']; ?>"		/> </p>
94	 	 <p>Password: <input type="password" name="pass1" size="10" maxlength="20" value="<?php if
(isset($_POST['pass1'])) echo $_POST['pass1']; ?>"		/></p>
95	 	 <p>Confirm Password: <input type="password" name="pass2" size="10" maxlength="20"
value="<?php if (isset($_POST['pass2'])) echo $_POST['pass2']; ?>"		/></p>
96	 	 <p><input type="submit" name="submit" value="Register" /></p>
97	 </form>
98	 <?php include ('includes/footer.html'); ?>

Retrieving Query Results:
The preceding section of this chapter
demonstrates how to execute simple
queries on a MySQL database. A simple
query, as I’m calling it, could be defined
as one that begins with INSERT, UPDATE,
DELETE, or ALTER. What all four of these have
in common is that they return no data, just
an indication of their success. Conversely,
a SELECT query generates information (i.e.,
it will return rows of records) that has to be
handled by other PHP functions.
The primary tool for handling SELECT query
results is mysqli_fetch_array(), which
uses the query result variable (that I’ve
been calling $r) and returns one row of
data at a time, in an array format. You’ll
want to use this function within a loop that
will continue to access every returned row
as long as there are more to be read. The
basic construction for reading every record
from a query is
while ($row = mysqli_fetch_array($r))
{
// Do something with $row.
}
You will almost always want to use
a while loop to fetch the results from
a SELECT query.
The mysqli_fetch_array() function takes
an optional second parameter specifying
what type of array is returned: associative,
indexed, or both. An associative array
allows you to refer to column values by
name, whereas an indexed array requires
you to use only numbers (starting at 0 for
the first column returned). Each parameter
is defined by a constant listed in Table 9.1,
with MYSQLI_BOTH being the default. The
MYSQLI_NUM setting is marginally faster
(and uses less memory) than the other
options. Conversely, MYSQLI_ASSOC is more
overt ($row['column'] rather than $row[3])
and may continue to work even if the
query changes.
An optional step you can take when using
mysqli_fetch_array() would be to free
up the query result resources once you are
done using them:
mysqli_free_result ($r);
This line removes the overhead (memory)
taken by $r. It’s an optional step, since PHP
will automatically free up the resources
at the end of a script, but—like using
mysqli_close()—it does make for good
programming form.
To demonstrate how to handle results
returned by a query, let’s create a script for
viewing all of the currently registered users.
EXERCISE:
1	 <?php	#	Script 9.4	-	view_users.php
2	 //	This	script retrieves all the records from the users table.
3	
4	 $page_title	=	'View the Current Users';
5	 include	('includes/header.html');
6	
7	 //	Page header:
8	 echo	'<h1>Registered Users</h1>';
9	
10	 require ('../mysqli_connect.php'); // Connect to the db.
11	 	 	
12	 // Make the query:
13	 $q	=	"SELECT CONCAT(last_name, ', ', first_name)	AS	name, DATE_FORMAT(registration_date, '%M %d,
%Y')	AS	dr FROM users ORDER BY registration_date	ASC";	 	
14	 $r	=	@mysqli_query ($dbc, $q); // Run the query.
15	
16	 if ($r)	{	// If it ran	OK,	display the records.
17	
18	 	 // Table header.
19	 	 echo '<table align="center" cellspacing="3" cellpadding="3" width="75%">
20	 	 <tr><td align="left"><b>Name</b></td><td align="left"><b>Date Registered</b></td></tr>
21	 ';
22	 	
23	 	 // Fetch and print all the records:
24	 	 while ($row	=	mysqli_fetch_array($r, MYSQLI_ASSOC))	{
25	 	 	 echo '<tr><td align="left">'	.	$row['name']	.	'</td><td align="left">'	.	$row['dr']	.		
	 	 	 '</td></tr>
26	 	 	 ';
27	 	 }
28	
29	 	 echo '</table>'; // Close the table.
30	 	
31	 	 mysqli_free_result ($r); // Free up the resources.	
32	
33	 } else	{	// If it did not run	OK.
34	
35	 	 // Public message:
36	 	 echo '<p class="error">The current users could not be retrieved. We apologize for any
inconvenience.</p>';
37	 	
38	 	 // Debugging message:
39	 	 echo '<p>'	.	mysqli_error($dbc)	.	'<br /><br />Query:	'	.	$q	.	'</p>';
40	 	
41	 } // End of if ($r) IF.
42	
43	 mysqli_close($dbc); // Close the database connection.
44	
45	 include ('includes/footer.html');
46	 ?>

Ensuring Secure SQL:
Database security with respect to PHP
comes down to three broad issues:
1. Protecting the MySQL access
information
2. Not revealing too much about the
database
3. Being cautious when running queries,
particularly those involving usersubmitted
data
You can accomplish the first objective by
securing the MySQL connection script outside
of the Web directory so that it is never
viewable through a Web browser (see C
in “Connecting to MySQL”). I discuss this
in some detail earlier in the chapter. The
second objective is attained by not letting
the user see PHP’s error messages or your
queries (in these scripts, that information is
printed out for your debugging purposes;
you’d never want to do that on a live site).
For the third objective, there are numerous
steps you can and should take, all
based upon the premise of never trusting
user-supplied data. First, validate that
some value has been submitted, or that it
is of the proper type (number, string, etc.).
Second, use regular expressions to make
sure that submitted data matches what you
would expect it to be. Third, you can typecast
some values to guarantee that they’re
numbers (discussed in Chapter 13, “Security
Methods”). A fourth recommendation
is to run user-submitted data through the
mysqli_real_escape_string() function.
This function makes data safe to use in a
query by escaping what could be problematic
characters. It’s used like so:
$safe = mysqli_real_escape_string
➝ ($dbc, data);
To understand why this is necessary, see E
in “Executing Simple Queries.” The use
of the apostrophe in the user’s last name
made the query syntactically invalid:
INSERT INTO users (first_name,
➝ last_name, email, pass,
➝ registration_date) VALUES ('Peter',
➝'O'Toole', 'pete@example.net',
➝ SHA1('aPass8'), NOW() )
In that particular example, valid user data
broke the query, which is not good. But if
your PHP script allows for this possibility,
a malicious user can purposefully submit
problematic characters (the apostrophe
being one example) in order to hack into,
or damage, your database. For security
purposes, mysqli_real_escape_string()
should be used on every text input in a
form. To demonstrate this, let’s revamp
register.php:
EXERCISE:
1	 <?php	#	Script 9.5	-	register.php #2
2	 //	This	script performs an INSERT query to add	a	record to the users table.
3	
4	 $page_title	=	'Register';
5	 include	('includes/header.html');
6	
7	 //	Check for form submission:
8	 if	($_SERVER['REQUEST_METHOD']	==	'POST')	{
9	
10 require ('../mysqli_connect.php'); // Connect to the db.
11	 	 	
12	 	 $errors	=	array(); // Initialize an error array.
13	 	
14	 	 // Check for	a	first name:
15	 	 if (empty($_POST['first_name']))	{
16	 	 	 $errors[]	=	'You forgot to enter your first name.';
17	 	 } else	{
18 $fn = mysqli_real_escape_string($dbc, trim($_POST['first_name']));
19	 	 }
20	 	
21	 	 // Check for	a	last name:
22	 	 if (empty($_POST['last_name']))	{
23	 	 	 $errors[]	=	'You forgot to enter your last name.';
24	 	 } else	{
25 $ln = mysqli_real_escape_string($dbc, trim($_POST['last_name']));
26	 	 }
27	 	
28	 	 // Check for an email address:
29	 	 if (empty($_POST['email']))	{
	30	 	 	 $errors[]	=	'You forgot to enter your email address.';
31	 	 } else	{
32 $e = mysqli_real_escape_string($dbc, trim($_POST['email']));
33	 	 }
34	 	
35	 	 // Check for	a	password and match against the confirmed password:
36	 	 if (!empty($_POST['pass1']))	{
37	 	 	 if ($_POST['pass1'] != $_POST['pass2'])	{
38	 	 	 	 $errors[]	=	'Your password did not match the confirmed password.';
39	 	 	 } else	{
40 $p = mysqli_real_escape_string($dbc, trim($_POST['pass1']));
41	 	 	 }
42	 	 } else	{
43	 	 	 $errors[]	=	'You forgot to enter your password.';
44	 	 }
45	 	
46	 	 if (empty($errors))	{	// If everything's	OK.
47	 	
48	 	 	 // Register the user in the database...
49	 	 	
50	 	 	 // Make the query:
51	 	 	 $q	=	"INSERT INTO users (first_name, last_name, email, pass, registration_date) VALUES
('$fn', '$ln', '$e', SHA1('$p'), NOW( )	)";	 	
52	 	 	 $r	=	@mysqli_query ($dbc, $q); // Run the query.
53	 	 	 if ($r)	{	// If it ran	OK.
54	 	 	
55	 	 	 	 // Print	a	message:
56	 	 	 	 echo '<h1>Thank you!</h1>
57	 	 	 <p>You are now registered. In Chapter 12 you will actually be able to log in!</p><p>	
	 	 	 <br /></p>';	
58	 	 	
59	 	 	 } else	{	// If it did not run	OK.
60	 	 	 	
61	 	 	 	 // Public message:
62	 	 	 	 echo '<h1>System Error</h1>
63	 	 	 	 <p class="error">You could not be registered due to	a	system error. We apologize for
any inconvenience.</p>';
64	 	 	 	
65	 	 	 	 // Debugging message:
66	 	 	 	 echo '<p>'	.	mysqli_error($dbc)	.	'<br /><br />Query:	'	.	$q	.	'</p>';
67	 	 	 	 	 	 	
68	 	 	 } // End of if ($r) IF.
69	 	 	
70	 	 	 mysqli_close($dbc); // Close the database connection.
71	
72	 	 	 // Include the footer and quit the script:
73	 	 	 include ('includes/footer.html');
74	 	 	 exit( );
75	 	 	
76	 	 } else	{	// Report the errors.
77	 	
78	 	 	 echo '<h1>Error!</h1>
79	 	 	 <p class="error">The following error(s) occurred:<br />';
80	 	 	 foreach ($errors as $msg)	{	// Print each error.
81	 	 	 	 echo	"	-	$msg<br />\n";
82	 	 	 }
83	 	 	 echo '</p><p>Please try again.</p><p><br /></p>';
84	 	 	
85	 	 } // End of if (empty($errors)) IF.
86	 	
87 mysqli_close($dbc); // Close the database connection.
88	
89	 } // End of the main Submit conditional.
90	 ?>
91	 <h1>Register</h1>
92	 <form action="register.php" method="post">
93	 	 <p>First Name: <input type="text" name="first_name" size="15" maxlength="20" value="<?php if
(isset($_POST['first_name'])) echo $_POST['first_name']; ?>" /></p>
94	 	 <p>Last Name: <input type="text" name="last_name" size="15" maxlength="40" value="<?php if
(isset($_POST['last_name'])) echo $_POST['last_name']; ?>" /></p>
95	 	 <p>Email Address: <input type="text" name="email" size="20" maxlength="60" value="<?php if
(isset($_POST['email'])) echo $_POST['email']; ?>"		/> </p>
96	 	 <p>Password: <input type="password" name="pass1" size="10" maxlength="20" value="<?php if
(isset($_POST['pass1'])) echo $_POST['pass1']; ?>"		/></p>
97	 	 <p>Confirm Password: <input type="password" name="pass2" size="10" maxlength="20"
value="<?php if (isset($_POST['pass2'])) echo $_POST['pass2']; ?>"		/></p>
98	 	 <p><input type="submit" name="submit" value="Register" /></p>
99	 </form>
100	 <?php include ('includes/footer.html'); ?>

Counting Returned
Records
The next logical function to discuss is
mysqli_num_rows(). This function returns
the number of rows retrieved by a SELECT
query. It takes one argument, the query
result variable:
$num = mysqli_num_rows($r);
Although simple in purpose, this function
is very useful. It’s necessary if you want to
paginate your query results (an example
of this can be found in the next chapter).
It’s also a good idea to use this function
before you attempt to fetch any results
using a while loop (because there’s no
need to fetch the results if there aren’t any,
and attempting to do so may cause errors).
In this next sequence of steps, let’s modify
view_users.php to list the total number of
registered users.
EXERCISE:
1	 <?php	#	Script 9.6	-	view_users.php #2
2	 //	This	script retrieves all the records
from the users table.
3	
4	 $page_title	=	'View the Current Users';
5	 include	('includes/header.html');
6	
7	 //	Page header:
8	 echo	'<h1>Registered Users</h1>';
9	
10	 require ('../mysqli_connect.php');		
	 // Connect to the db.
11	 	 	
12	 // Make the query:
13	 $q	=	"SELECT CONCAT(last_name, ', ',		
first_name)	AS	name, DATE_FORMAT	
(registration_date, '%M %d, %Y')	AS	dr
FROM users ORDER BY registration_date	ASC";
14	 $r	=	@mysqli_query ($dbc, $q); // Run
the query.
15	
16	 // Count the number of returned rows:
17 $num = mysqli_num_rows($r);
18	
19 if ($num > 0) { // If it ran OK,
display the records.
20	
21	 	 // Print how many users there are:
22 echo "<p>There are currently $num
 registered users.</p>\n";
23	
24	 	 // Table header.
25	 	 echo '<table align="center"
cellspacing="3" cellpadding="3"
width="75%">
26	 	 <tr><td align="left"><b>Name</
b></td><td align="left"><b>Date
Registered</b></td></tr>
27	 ';
28	 	
29	 	 // Fetch and print all the records:
30	 	 while ($row	=	mysqli_fetch_array($r,
MYSQLI_ASSOC))	{
31	 	 	 echo '<tr><td align="left">'	.		
$row['name']	.	'</td><td align=	
"left">'	.	$row['dr']	.	'</td></tr>
32	 	 	 ';
33	 	 }
34	
35	 	 echo '</table>'; // Close the table.
36	 	
37	 	 mysqli_free_result ($r); // Free up
the resources.	
38	
39	 }	else	{	// If no records were returned.
40	
41 echo '<p class="error">There are
 currently no registered users.</p>';
42	
43	 }
44	
45	 mysqli_close($dbc); // Close the database
connection.
46	
47	 include ('includes/footer.html');
48	 ?>

Updating Records With PHP:
The last technique in this chapter shows
how to update database records through
a PHP script. Doing so requires an UPDATE
query, and its successful execution can
be verified with PHP’s mysqli_affected_
rows() function.
While the mysqli_num_rows() function will
return the number of rows generated by a
SELECT query, mysqli_affected_rows()
returns the number of rows affected by an
INSERT, UPDATE, or DELETE query. It’s used
like so:
$num = mysqli_affected_rows($dbc);
Unlike mysqli_num_rows(), the one argument
the function takes is the database
connection ($dbc), not the results of the
previous query ($r).
The following example will be a script
that allows registered users to change
their password. It demonstrates two
important ideas:
n	 Checking a submitted username and
password against registered values
(the key to a login system as well)
n	 Updating database records using the
primary key as a reference
As with the registration example, this one
PHP script will both display the form A
and handle it.
EXERCISE:
1	 <?php	#	Script 9.7	-	password.php
2	 //	This	page lets	a	user change their
password.
3	
4	 $page_title	=	'Change Your Password';
5	 include	('includes/header.html');
6	
7	 //	Check for form submission:
8	 if ($_SERVER['REQUEST_METHOD']	==	'POST') {
9	
10	 	 require ('../mysqli_connect.php');		
// Connect to the db.
11	 	 	
12	 	 $errors	=	array(); // Initialize an
error array.
13	 	
14	 	 // Check for an email address:
15	 	 if (empty($_POST['email']))	{
16	 	 	 $errors[]	=	'You forgot to enter
your email address.';
17	 	 } else	{
18	 	 	 $e	=	mysqli_real_escape_string	
($dbc, trim($_POST['email']));
19	 	 }
20	
21	 	 // Check for the current password:
22	 	 if (empty($_POST['pass']))	{
23	 	 	 $errors[]	=	'You forgot to enter
your current password.';
24	 	 } else	{
25	 	 	 $p	=	mysqli_real_escape_string	
($dbc, trim($_POST['pass']));
26	 	 }
27	
28	 	 // Check for	a	new password and match
29	 	 // against the confirmed password:
30	 	 if (!empty($_POST['pass1']))	{
31	 	 	 if ($_POST['pass1'] != $_POST['pass2'])	{
32	 	 	 	 $errors[]	=	'Your new password did not match the confirmed password.';
33	 	 	 } else	{
34	 	 	 	 $np	=	mysqli_real_escape_string($dbc, trim($_POST['pass1']));
35	 	 	 }
36	 	 } else	{
37	 	 	 $errors[]	=	'You forgot to enter your new password.';
38	 	 }
39	 	
40	 	 if (empty($errors))	{	// If everything's	OK.
41	
42	 	 	 // Check that they've entered the right email address/password combination:
43	 	 	 $q	=	"SELECT user_id FROM users WHERE (email='$e' AND pass=SHA1('$p') )";
44	 	 	 $r	=	@mysqli_query($dbc, $q);
45	 	 	 $num	=	@mysqli_num_rows($r);
46	 	 	 if ($num	==	1)	{	// Match was made.
47	 	
48	 	 	 	 // Get the user_id:
49	 	 	 	 $row	=	mysqli_fetch_array($r, MYSQLI_NUM);
50	
51	 	 	 	 // Make the UPDATE query:
52	 	 	 	 $q	=	"UPDATE users SET pass=SHA1('$np') WHERE user_id=$row[0]";	
53	 	 	 	 $r	=	@mysqli_query($dbc, $q);
54	 	 	 	
55	 	 	 	 if (mysqli_affected_rows($dbc)	==	1)	{	// If it ran	OK.
56	
57	 	 	 	 	 // Print	a	message.
58	 	 	 	 	 echo '<h1>Thank you!</h1>
59	 	 	 	 	 <p>Your password has been updated. In Chapter 12 you will actually be able to log
in!</p><p><br /></p>';	
	} else {
		echo '<h1>System Error</h1> <p>Your password can not be changed</p>';


66	 	
67	 	 	 	 	 // Debugging message:
68	 	 	 	 	 echo '<p>'	.	mysqli_error($dbc)	.	'<br /><br />Query:	'	.	$q	.	'</p>';
69	 	
70	 	 	 	 }
71	
72	 	 	 	 mysqli_close($dbc); // Close the database connection.
73	
74	 	 	 	 // Include the footer and quit the script (to not show the form).
75	 	 	 	 include ('includes/footer.html');
76	 	 	 	 exit( );
77	 	 	 	 	
78	 	 	 } else	{	// Invalid email address/password combination.
	80	 	 	 	 <p class="error">The email
address and password do not
match those on file.</p>';
81	 	 	 }
82	 	 	
83	 	 } else	{	// Report the errors.
84	
85	 	 	 echo '<h1>Error!</h1>
86	 	 	 <p class="error">The following
error(s) occurred:<br />';
87	 	 	 foreach ($errors as $msg)	{	//
Print each error.
88	 	 	 	 echo	"	-	$msg<br />\n";
89	 	 	 }
90	 	 	 echo '</p><p>Please try again.</
p><p><br /></p>';
91	 	
92	 	 } // End of if (empty($errors)) IF.
93	
94	 	 mysqli_close($dbc); // Close the
database connection.
95	 	 	
96	 } // End of the main Submit conditional.
97	 ?>
98	 <h1>Change Your Password</h1>
99	 <form action="password.php"
method="post">
100	 	 <p>Email Address: <input type="text"
name="email" size="20" maxlength="60"
value="<?php if (isset($_POST['email']))
echo $_POST['email']; ?>"		/> </p>
101	 	 <p>Current Password: <input
type="password" name="pass" size="10"
maxlength="20" value="<?php if
(isset($_POST['pass'])) echo $_
POST['pass']; ?>"		/></p>
102	 	 <p>New Password: <input
type="password" name="pass1"
size="10" maxlength="20" value="<?php
if (isset($_POST['pass1'])) echo $_
POST['pass1']; ?>"		/></p>
103	 	 <p>Confirm New Password: <input
type="password" name="pass2"	
size="10" maxlength="20" value="<?php
if (isset($_POST['pass2'])) echo $_
POST['pass2']; ?>"		/></p>
104	 	 <p><input type="submit" name="submit"
value="Change Password" /></p>
105	 </form>
106	 <?php include ('includes/footer.html');
?>
