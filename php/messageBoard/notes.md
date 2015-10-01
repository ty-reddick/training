Making the Database:
1. Create a database named forum

2. Create the languages table F:
CREATE TABLE languages (
lang_id TINYINT UNSIGNED NOT NULL
➝ AUTO_INCREMENT,
lang VARCHAR(60) NOT NULL,
lang_eng VARCHAR(20) NOT NULL,
PRIMARY KEY (lang_id),
UNIQUE (lang)
);
This is the simplest table of the bunch.
There won’t be many languages represented,
so the primary key (lang_id) can
be a TINYINT. The lang column is defined
a bit larger, as it’ll store characters in
other languages, which may require
more space. This column must also be
unique. Note that I don’t call this column
“language,” as that’s a reserved keyword
in MySQL (actually, I could still call it that,
and you’ll see what would be required to
do that in Step 7). The lang_eng column
is the English equivalent of the language
so that the administrator can easily see
which languages are which.

3. Create the threads table G:
CREATE TABLE threads (
thread_id INT UNSIGNED NOT NULL
➝ AUTO_INCREMENT,
lang_id TINYINT(3) UNSIGNED NOT
➝ NULL,
user_id INT UNSIGNED NOT NULL,
subject VARCHAR(150) NOT NULL,
PRIMARY KEY (thread_id),
INDEX (lang_id),
INDEX (user_id)
);
The threads table contains four
columns and relates to both the
languages and users tables (through
the lang_id and user_id foreign keys,
respectively). The subject here needs
to be long enough to store subjects in
multiple languages (characters take up
more bytes in non-Western languages).
G Creating the threads table. This table stores the topic subjects
and associates them with a language (i.e., a forum).
H Creating the posts table, which links to both threads and users.
The columns that will be used in joins
and WHERE clauses—lang_id and
user_id—are indexed, as is thread_id
(as a primary key, it’ll be indexed).

4. Create the posts table H:
CREATE TABLE posts (
post_id INT UNSIGNED NOT NULL
➝ AUTO_INCREMENT,
thread_id INT UNSIGNED NOT NULL,
user_id INT UNSIGNED NOT NULL,
message TEXT NOT NULL,
posted_on DATETIME NOT NULL,
PRIMARY KEY (post_id),
INDEX (thread_id),
INDEX (user_id)
);
The main column in this table is message,
which stores each post’s body.
Two columns are foreign keys, tying
into the threads and users tables. The posted_on column is of type DATETIME,
but will use UTC (Coordinated Universal
Time, see Chapter 6). Nothing special
needs to be done here for that, though.

5. Create the users table:
CREATE TABLE users (
user_id MEDIUMINT UNSIGNED NOT
➝ NULL AUTO_INCREMENT,
lang_id TINYINT UNSIGNED NOT NULL,
time_zone VARCHAR(30) NOT NULL,
username VARCHAR(30) NOT NULL,
pass CHAR(40) NOT NULL,
email VARCHAR(60) NOT NULL,
PRIMARY KEY (user_id),
UNIQUE (username),
UNIQUE (email),
INDEX login (username, pass)
);
For the sake of brevity, I’m omitting
some of the other columns you’d put
in this table, such as registration date,
first name, and last name. For more on
creating and using a table like this, see
the next chapter.
In my thinking about this site, I expect
users will select their preferred language
and time zone when they
register, so that they can have a more
personalized experience. They can also
have a username, which will be displayed
in posts (instead of their email
address). Both the username and the
email address must be unique, which is
something you’d need to address in the
registration process

6. Create the words table J:
CREATE TABLE words (
word_id TINYINT UNSIGNED NOT NULL
➝ AUTO_INCREMENT,
lang_id TINYINT UNSIGNED NOT NULL,
title VARCHAR(80) NOT NULL,
intro TINYTEXT NOT NULL,
home VARCHAR(30) NOT NULL,
forum_home VARCHAR(40) NOT NULL,
`language` VARCHAR(40) NOT NULL,
register VARCHAR(30) NOT NULL,
login VARCHAR(30) NOT NULL,
logout VARCHAR(30) NOT NULL,
new_thread VARCHAR(40) NOT NULL,
subject VARCHAR(30) NOT NULL,
body VARCHAR(30) NOT NULL,
submit VARCHAR(30) NOT NULL,
posted_on VARCHAR(30) NOT NULL,
posted_by VARCHAR(30) NOT NULL,
replies VARCHAR(30) NOT NULL,
latest_reply VARCHAR(40) NOT NULL,
post_a_reply VARCHAR(40) NOT NULL,
PRIMARY KEY (word_id),
UNIQUE (lang_id)
);
J Creating the words
table, which stores
representations of
key words in different
languages.
This table will store different
translations of common elements used
on the site. Some elements—home,
forum_home, language, register,
login, logout, and new_thread—will be
the names of links. Other elements—
subject, body, submit—are used on the
page for posting messages. Another
category of elements are those used
on the forum’s main page: posted_on,
posted_by, replies, and latest_reply.
Some of these will be used multiple
times in the site, and yet, this is still an
incomplete list. As you implement the
site yourself, you’ll see other places
where word definitions could be added.
Each column is of VARCHAR type, except
for intro, which is a body of text to be
used on the main page. Most of the
columns have a limit of 30, allowing
for characters in other languages that
require more bytes, except for a handful
of columns that might need to be bigger.
For each column, its name implies the
value to be stored in that column. For
one—language—I’ve used a MySQL keyword, simply to demonstrate how
that can be done. The fix is to surround
the column’s name in backticks so that
MySQL doesn’t confuse this column’s
name with the keyword “language.”

7. Populate the languages table:
INSERT INTO languages (lang,
➝ lang_eng) VALUES
('English', 'English'),
('Português', 'Portuguese'),
('Français', 'French'),
('Norsk', 'Norwegian'),
('Romanian', 'Romanian'),
(' ', 'Greek'),
('Deutsch', 'German'),
('Srpski', 'Serbian'),
(' ', 'Japanese'),
('Nederlands', 'Dutch');
This is just a handful of the languages
the site will represent thanks to some
assistance provided me For each, the native and English word
for that language is stored

8. Populate the users table L:
INSERT INTO users (lang_id,
➝ time_zone, username, pass,
➝ email) VALUES
(1, 'America/New_York',
➝'troutster', SHA1('password'),
➝'email@example.com'),
(7, 'Europe/Berlin', 'Ute',
➝ SHA1('pa24word'),
➝'email1@example.com'),
(4, 'Europe/Oslo', 'Silje',
➝ SHA1('2kll13'),
➝'email2@example.com'),
(2, 'America/Sao_Paulo', 'João',
➝ SHA1('fJDLN34'),
➝'email3@example.com'),
(1, 'Pacific/Auckland', 'kiwi',
➝ SHA1('conchord'),
➝'kiwi@example.org');
Because the PHP scripts will show the
users associated with posts, a couple
of users are necessary. A language and
a time zone are associated with each
(see Chapter 6 for more on time zones
in MySQL). Each user’s password will be
encrypted with the SHA1() function

9. . Populate the words table:
INSERT INTO words VALUES
(NULL, 1, 'PHP and MySQL for
➝ Dynamic Web Sites: The Forum!',
➝'<p>Welcome to our site....
➝ please use the links above...
➝ blah, blah, blah.</p>\r\n
➝ <p>Welcome to our site....please
➝ use the links above...blah,
➝ blah, blah.</p>', 'Home',
➝'Forum Home', 'Language',
➝'Register', 'Login', 'Logout',
➝'New Thread', 'Subject', 'Body',
➝'Submit', 'Posted on', 'Posted
➝ by', 'Replies', 'Latest Reply',
➝'Post a Reply');
These are the words associated with
each term in English. The record has a
lang_id of 1, which matches the lang_id
for English in the languages table. The
SQL to insert words for other languages
into this table is available from the
book’s supporting Web site

MAKING THE TEMPLATE:
1. Make the header.html:
(See header1.png & header2.png)

CREATE THE INDEX PAGE (index.php):
1	 <?php	#	Script 17.3	-	index.php
2	 //	This	is	the main page for the site.
3	
4	 //	Include the HTML header:
5	 include	('includes/header.html');
6	
7	 //	The	content on this page	is	introductory text
8	 // pulled from the database, based upon the
9	 //	selected language:
10	 echo $words['intro'];
11	
12	 // Include the HTML footer file:
13	 include ('includes/footer.html');
14	 ?>

CREATE THE FORUM PAGE:
forum.php:
<?php 
	include ('includes/header.html');

	// If the user	is	logged in and has chosen	a	time zone,
	 // use that to convert the dates and
times:
	 if	(isset($_SESSION['user_tz']))	{
	 	 $first	=	"CONVERT_TZ(p.posted_on,
'UTC', '{$_SESSION['user_tz']}')";
	 	 $last	=	"CONVERT_TZ(p.posted_on,
'UTC', '{$_SESSION['user_tz']}')";
	 } else	{
	 	 $first	=	'p.posted_on';
	 	 $last	=	'p.posted_on';
	 }
17	 //	The	query for retrieving all the threads in this forum, along with the original user,
18	 // when the thread was first posted, when it was last replied to, and how many replies it's had:
19	 $q	=	"SELECT t.thread_id, t.subject, username, COUNT(post_id)	-	1	AS	responses, MAX(DATE_FORMAT	
($last, '%e-%b-%y %l:%i %p'))	AS	last, MIN(DATE_FORMAT($first, '%e-%b-%y %l:%i %p'))	AS	first
FROM threads	AS	t	INNER JOIN posts	AS	p	USING (thread_id) INNER JOIN users	AS	u	ON t.user_id	=	
u.user_id WHERE t.lang_id	=	{$_SESSION['lid']} GROUP BY (p.thread_id) ORDER BY last DESC";
20	 $r	=	mysqli_query($dbc, $q);
21	 if (mysqli_num_rows($r)	>	0)	{
22	
23	 	 // Create	a	table:
24	 	 echo '<table width="100%" border="0" cellspacing="2" cellpadding="2" align="center">
25	 	 	 <tr>
26	 	 	 	 <td align="left" width="50%"><em>'	.	$words['subject']	.	'</em>:</td>
27	 	 	 	 <td align="left" width="20%"><em>'	.	$words['posted_by']	.	'</em>:</td>
28	 	 	 	 <td align="center" width="10%"><em>'	.	$words['posted_on']	.	'</em>:</td>
29	 	 	 	 <td align="center" width="10%"><em>'	.	$words['replies']	.	'</em>:</td>
30	 	 	 	 <td align="center" width="10%"><em>'	.	$words['latest_reply']	.	'</em>:</td>
31	 	 	 </tr>';
32	
33	 	 // Fetch each thread:
34	 	 while ($row	=	mysqli_fetch_array($r, MYSQLI_ASSOC))	{
35	
36	 	 	 echo '<tr>
37	 	 	 	 	 <td align="left"><a href="read.php?tid='	.	$row['thread_id']	.	'">'	.	$row['subject']
.	'</a></td>
38	 	 	 	 	 <td align="left">'	.	$row['username']	.	'</td>
39	 	 	 	 	 <td align="center">'	.	$row['first']	.	'</td>
40	 	 	 	 	 <td align="center">'	.	$row['responses']	.	'</td>
41	 	 	 	 	 <td align="center">'	.	$row['last']	.	'</td>
42	 	 	 	 </tr>';
43	
44	 	 }
45	 	
46	 	 echo '</table>'; // Complete the table.
47	 	
48	 } else	{
49	 	 echo '<p>There are currently no messages in this forum.</p>';
50	 }
51	
52	 // Include the HTML footer file:
53	 include ('includes/footer.html');
54	 ?>

CREATE THE THREAD PAGE:
1	 <?php	#	Script 17.5	-	read.php
2	 //	This	page shows the messages in	a	thread.
3	 include	('includes/header.html');
4	
5	 //	Check for	a	thread ID...
6	 $tid	=	FALSE;
7	 if	(isset($_GET['tid'])	&&	filter_var($_GET['tid'], FILTER_VALIDATE_INT, array('min_range' => 1))	)	{
8	 	
9	 	 //	Create	a	shorthand version of the thread ID:
10	 	 $tid	=	$_GET['tid'];
11	 	
12	 	 // Convert the date if the user	is	logged in:
13	 	 if (isset($_SESSION['user_tz']))	{
14	 	 	 $posted	=	"CONVERT_TZ(p.posted_on, 'UTC', '{$_SESSION['user_tz']}')";
15	 	 } else	{
16	 	 	 $posted	=	'p.posted_on';
17	 	 }
18	
19	 	 // Run the query:
20	 	 $q	=	"SELECT t.subject, p.message, username, DATE_FORMAT($posted, '%e-%b-%y %l:%i %p')	AS	
posted FROM threads	AS	t	LEFT JOIN posts	AS	p	USING (thread_id) INNER JOIN users	AS	u	ON
p.user_id	=	u.user_id WHERE t.thread_id	=	$tid ORDER BY p.posted_on	ASC";
21	 	 $r	=	mysqli_query($dbc, $q);
22	 	 if (!(mysqli_num_rows($r)	>	0))	{
23	 	 	 $tid	=	FALSE; // Invalid thread ID!
24	 	 }
25	 	
26	 } // End of	isset($_GET['tid'])	IF.
27	
28	 if ($tid)	{	// Get the messages in this thread...
29	 	
30	 	 $printed	=	FALSE; // Flag variable.
31	
32	 	 // Fetch each:
33	 	 while ($messages	=	mysqli_fetch_array($r, MYSQLI_ASSOC))	{
34	
35	 	 	 // Only need to print the subject once!
36	 	 	 if (!$printed)	{
37	 	 	 	 echo "<h2>{$messages['subject']}</h2>\n";
38	 	 	 	 $printed	=	TRUE;
39	 	 	 }
40	 	
41	 	 	 // Print the message:
42	 	 	 echo "<p>{$messages['username']} ({$messages['posted']})<br />{$messages['message']}</p><br />\n";
43	
44	 	 } // End of WHILE loop.
45	 	 	
46	 	 // Show the form to post	a	message:
47	 	 include ('includes/post_form.php');
48	 	
49	 } else	{	// Invalid thread ID!
50	 	 echo '<p>This page has been accessed in error.</p>';
51	 }
52	
53	 include ('includes/footer.html');
54	 ?>

POSTING MESSAGES:
1	 <?php	#	Script 17.6	-	post_form.php
2	 //	This	page shows the form for posting
messages.
3	 // It's included by other pages, never
called directly.
4	
5	 // Redirect if this page	is	called
directly:
6	 if	(!isset($words))	{
7	 	 header ("Location: http://www.example.
com/index.php");
8	 	 exit( );
9	 }
10	
11	 // Only display this form if the user	is	
logged in:
12	 if (isset($_SESSION['user_id']))	{
13	
14	 	 // Display the form:
15	 	 echo '<form action="post.php"
method="post" accept-charset="utf-8">';
16	 	
17	 	 // If on read.php...
18	 	 if (isset($tid)	&&	$tid)	{
19	
20	 	 	 // Print	a	caption:
21	 	 	 echo '<h3>'	.	$words['post_a_reply']
.	'</h3>';
22	 	
23	 	 	 // Add the thread ID as	a	hidden
input:
24	 	 	 echo '<input name="tid" type=	
"hidden" value="'	.	$tid	.	'" />';
25	 	 	
26	 	 } else	{	// New thread
27	
28	 	 	 // Print	a	caption:
29	 	 	 echo '<h3>'	.	$words['new_thread']
.	'</h3>';
30	 	
31	 	 	 // Create subject input:
32	 	 	 echo '<p><em>'	.	$words['subject']
.	'</em>: <input name="subject"
type="text" size="60"
maxlength="100" ';
33
34	 	 	 // Check for existing value:
35	 	 	 if (isset($subject))	{
36	 	 	 	 echo "value=\"$subject\" ";
37	 	 	 }
38	 	
39	 	 	 echo '/></p>';
40	 	
41	 	 } // End of $tid IF.
42	 	
43	 	 // Create the body textarea:
44	 	 echo '<p><em>'	.	$words['body']	.		
'</em>: <textarea name="body"
rows="10" cols="60">';
45	
46	 	 if (isset($body))	{
47	 	 	 echo $body;
48	 	 }
49	
50	 	 echo '</textarea></p>';
51	 	
52	 	 // Finish the form:
53	 	 echo '<input name="submit" type="submit"
value="'	.	$words['submit']	.	'" />
54	 	 </form>';
55	 	
56	 } else	{
57	 	 echo '<p>You must be logged in to
post messages.</p>';
58	 }
59	
60	 ?>

HANDLING THE FORM:
1	 <?php	#	Script 17.7	-	post.php
2	 //	This	page handles the message post.
3	 // It also displays the form if creating
a	new thread.
4	 include	('includes/header.html');
5	
6	 if ($_SERVER['REQUEST_METHOD']	==	'POST')
{	// Handle the form.
7	
8	 	 //	Language ID	is	in the session.
9	 	 // Validate thread ID ($tid), which
may not be present:
10	 	 if (isset($_POST['tid'])	&&	filter_var	
($_POST['tid'], FILTER_VALIDATE_INT,
array('min_range' => 1))	)	{
11	 	 	 $tid	=	$_POST['tid'];
12	 	 } else	{
13	 	 	 $tid	=	FALSE;
14	 	 }
15	
16	 	 // If there's no thread ID,	a	subject
must be provided:
17	 	 if (!$tid	&&	empty($_POST['subject'])) {
18	 	 	 $subject	=	FALSE;
19	 	 	 echo '<p>Please enter	a	subject
for this post.</p>';
20	 	 }	elseif (!$tid	&&	!empty($_POST	
['subject']))	{
21	 	 	 $subject	=	htmlspecialchars(strip_
tags($_POST['subject']));
22	 	 }	else	{	//	Thread	ID, no need for
subject.
23	 	 	 $subject	=	TRUE;
24	 	 }
25	 	
26	 	 // Validate the body:
27	 	 if (!empty($_POST['body']))	{
28	 	 	 $body = htmlentities($_POST['body']);
29	 	 } else	{
30	 	 	 $body	=	FALSE;
31	 	 	 echo '<p>Please enter	a	body for this post.</p>';
32	 	 }
33	 	
34	 	 if ($subject	&&	$body)	{	//	OK!
35	 	
36	 	 	 // Add the message to the database...
37	 	 	
38	 	 	 if (!$tid)	{	// Create	a	new thread.
39	 	 	 	 $q	=	"INSERT INTO threads (lang_id, user_id, subject) VALUES ({$_SESSION['lid']},		
{$_SESSION['user_id']}, '"	.	mysqli_real_escape_string($dbc, $subject)	.	"')";
40	 	 	 	 $r	=	mysqli_query($dbc, $q);
41	 	 	 	 if (mysqli_affected_rows($dbc)	==	1)	{
42	 	 	 	 	 $tid	=	mysqli_insert_id($dbc);
43	 	 	 	 } else	{
44	 	 	 	 	 echo '<p>Your post could not be handled due to	a	system error.</p>';
45	 	 	 	 }
46	 	 	 } // No $tid.
47	 	 	
48	 	 	 if ($tid)	{	// Add this to the replies table:
49	 	 	 	 $q	=	"INSERT INTO posts (thread_id, user_id, message, posted_on) VALUES ($tid,		
{$_SESSION['user_id']}, '"	.	mysqli_real_escape_string($dbc, $body)	.	"', UTC_TIMESTAMP())";
50	 	 	 	 $r	=	mysqli_query($dbc, $q);
51	 	 	 	 if (mysqli_affected_rows($dbc)	==	1)	{
52	 	 	 	 	 echo '<p>Your post has been entered.</p>';
53	 	 	 	 } else	{
54	 	 	 	 	 echo '<p>Your post could not be handled due to	a	system error.</p>';
55	 	 	 	 }
56	 	 	 } // Valid $tid.
57	 	
58	 	 } else	{	// Include the form:
59	 	 	 include ('includes/post_form.php');
60	 	 }
61	
62	 } else	{	// Display the form:
63	 	
64	 	 include ('includes/post_form.php');
65	
66	 }
67	
68	 include ('includes/footer.html');
69	 ?>