CREATE THE TEMPLATES:
header.html:
1	 <?php	#	Script 18.1	-	header.html
2	 //	This	page begins the HTML header for
the site.
3	
4	 //	Start output buffering:
5	 ob_start( );
6	
7	 //	Initialize	a	session:
8	 session_start( );
9	
10	 // Check for	a	$page_title value:
11	 if (!isset($page_title))	{
12	 	 $page_title	=	'User Registration';
13	 }
14	 ?>
15	 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML
1.0 Transitional//EN"
16	 	 	 "http://www.w3.org/TR/xhtml1/DTD/
xhtml1-transitional.dtd">
17	 <html xmlns="http://www.w3.org/1999/
xhtml" xml:lang="en" lang="en">
18	 <head>
19	 	 <meta http-equiv="content-type"
content="text/html; charset=utf-8" />
20	 	 <title><?php echo $page_title; ?></
title>
21	 	 <style type="text/css"
media="screen">@import "includes/
layout.css";</style>
22	 </head>
23	 <body>
24	 <div id="Header">User Registration</div>
25	 	 <div id="Content">
26	 <!-- End of Header -->
1	 <!--	Start of Footer -->
2	 </div><!--	Content -->
3	
4	 <div	id="Menu">
5	 	 <a href="index.php" title="Home
Page">Home</a><br />
6	 	 <?php	#	Script 18.2	-	footer.html
7	 	 //	This	page completes the HTML
template.
8	
9	 	 // Display links based upon the login
status:
10	 	 if (isset($_SESSION['user_id']))	{
11	
12	 	 	 echo '<a href="logout.php"
title="Logout">Logout</a><br />
13	 	 <a href="change_password.php"
title="Change Your Password">Change
Password</a><br />
14	 	 ';
15	
16	 	 	 // Add links if the user	is	an
administrator:
17	 	 	 if ($_SESSION['user_level']	==	1)	{
18	 	 	 	 echo '<a href="view_users.php"
title="View All Users">View
Users</a><br />
19	 	 	 <a href="#">Some Admin Page</a><br
/>
20	 	 	 ';
21	 	 	 }
22	 	
23	 	 } else	{	//		Not logged in.
24	 	 	 echo '<a href="register.
php" title="Register for the
Site">Register</a><br />
25	 	 <a href="login.php"
title="Login">Login</a><br />
26	 	 <a href="forgot_password.php"
title="Password Retrieval">Retrieve
Password</a><br />
27	 	 ';
28	 	 }
29	 	 ?>
30	 	 <a href="#">Some Page</a><br />
31	 	 <a href="#">Another Page</a><br />
32	 </div><!-- Menu -->
33	
34	 </body>
35	 </html>
36	 <?php // Flush the buffered output.
37	 ob_end_flush();
38	 ?>

MAKE THE FOOTER.HTML:

Writing the Configuration Scripts:
1	 <?php	#	Script 18.3	-	config.inc.php
2	 /*	This	script:
3	 	*	-	define constants and settings
4	 	*	-	dictates how errors are handled
5	 	*	-	defines useful functions
6	 	*/
7	
8	 //	Document who created this site, when,		
	 why, etc.
9	
10	
11	 // ********************************** //
12	 // ************ SETTINGS ************ //
13	
14	 // Flag variable for site status:
15	 define('LIVE', FALSE);
16	
17	 // Admin contact address:
18	 define('EMAIL', 'InsertRealAddressHere');
19	
20	 // Site URL (base for all redirections):
21	 define ('BASE_URL', 'http://www.example.	
	 com/');
22	
23	 // Location of the MySQL connection		
	 script:
24	 define ('MYSQL', '/path/to/mysqli_connect.	
	 php');
25	
26	 // Adjust the time zone for PHP 5.1 and		
	 greater:
27	 date_default_timezone_set ('US/Eastern');
28	
29	 // ************ SETTINGS ************ //
30	 // ********************************** //
31	
32	
33	 // **************************************
**** //
34	 // ************ ERROR MANAGEMENT
************ //
35	
36	 // Create the error handler:
37	 function my_error_handler ($e_number,
$e_message, $e_file, $e_line, $e_vars)	{
38	
39	 	 // Build the error message:
40	 	 $message	=	"An error occurred in
script '$e_file' on line $e_line:
$e_message\n";
41	 	
42	 	 // Add the date and time:
43	 	 $message .= "Date/Time:	"	.	date('nj-Y
H:i:s')	.	"\n";
44	 	
45	 	 if (!LIVE)	{	// Development (print the
error).
46	
47	 	 	 // Show the error message:
48	 	 	 echo '<div class="error">'	.	
nl2br($message);
49	 	
50	 	 	 // Add the variables and	a	
backtrace:
51	 	 	 echo '<pre>'	.	print_r ($e_vars, 1)
.	"\n";
52	 	 	 debug_print_backtrace( );
53	 	 	 echo '</pre></div>';
54	 	 	
55	 	 } else	{	// Don't show the error:
56	
57	 	 	 // Send an email to the admin:
58	 	 	 $body	=	$message	.	"\n"	.	print_r
($e_vars, 1);
59	 	 	 mail(EMAIL, 'Site Error!', $body,
'From: email@example.com');
60	 	
61	 	 	 // Only print an error message if
the error	isn't	a	notice:
62	 	 	 if ($e_number != E_NOTICE)	{
63	 	 	 	 echo '<div class="error">A
system error occurred.
We apologize for the
inconvenience.</div><br />';
64	 	 	 }
65	 	 } // End of !LIVE IF.
66	
67	 }	// End of my_error_handler( )	
definition.
68	
69	 // Use my error handler:
70	 set_error_handler ('my_error_handler');
71	
72	 // ************ ERROR MANAGEMENT
************ //
73	 // **************************************
**** //

CONNECT TO THE DATABASE:
1	 <?php	#	Script 18.4	-	mysqli_connect.php
2	 //	This	file contains the database
access information.
3	 //	This	file also establishes	a	
connection to MySQL
4	 //	and selects the database.
5	
6	 // Set the database access information
as constants:
7	 DEFINE	('DB_USER', 'username');
8	 DEFINE	('DB_PASSWORD', 'password');
9	 DEFINE	('DB_HOST', 'localhost');
10	 DEFINE ('DB_NAME', 'ch18');
11	
12	 // Make the connection:
13	 $dbc	=	@mysqli_connect (DB_HOST, DB_
USER, DB_PASSWORD, DB_NAME);
14	
15	 // If no connection could be made,
trigger an error:
16	 if (!$dbc)	{
17	 	 trigger_error ('Could not connect to
MySQL:	'	.	mysqli_connect_error( )	);
18	 } else	{	// Otherwise, set the encoding:
19	 	 mysqli_set_charset($dbc, 'utf8');
20	 }
	?>

CREATE THE HOMEPAGE:
1	 <?php	#	Script 18.5	-	index.php
2	 //	This	is	the main page for the site.
3	
4	 //	Include the configuration file:
5	 require	('includes/config.inc.php');
6	
7	 // Set the page title and include the
HTML header:
8	 $page_title	=	'Welcome to this Site!';
9	 include	('includes/header.html');
10	
11	 // Welcome the user (by name if they are
logged in):
12	 echo '<h1>Welcome';
13	 if (isset($_SESSION['first_name']))	{
14	 	 echo ", {$_SESSION['first_name']}";
15	 }
16	 echo '!</h1>';
17	 ?>
18	 <p>Spam spam spam spam spam spam
19	 spam spam spam spam spam spam
20	 spam spam spam spam spam spam
21	 spam spam spam spam spam spam.</p>
22	 <p>Spam spam spam spam spam spam
23	 spam spam spam spam spam spam
24	 spam spam spam spam spam spam
25	 spam spam spam spam spam spam.</p>
26	
27	 <?php include ('includes/footer.html');
?>

REGISTRATION:
1	 <?php	#	Script 18.6	-	register.php
2	 //	This	is	the registration page for the
site.
3	 require	('includes/config.inc.php');
4	 $page_title	=	'Register';
5	 include	('includes/header.html');
6	
7	 if ($_SERVER['REQUEST_METHOD']	==	'POST')
{	// Handle the form.
8	
9	 	 //	Need the database connection:
10	 	 require (MYSQL);
11	 	
12	 	 // Trim all the incoming data:
13	 	 $trimmed	=	array_map('trim', $_POST);
14	
15	 	 // Assume invalid values:
16	 	 $fn	=	$ln	=	$e	=	$p	=	FALSE;
17	 	
18	 	 // Check for	a	first name:
19	 	 if (preg_match ('/^[A-Z \'.-]{2,20}$/i',
$trimmed['first_name']))	{
20	 	 	 $fn	=	mysqli_real_escape_string
($dbc, $trimmed['first_name']);
21	 	 } else	{
22	 	 	 echo '<p class="error">Please enter
your first name!</p>';
23	 	 }
24	
25	 	 // Check for	a	last name:
26	 	 if (preg_match ('/^[A-Z \'.-]{2,40}$/i',
$trimmed['last_name']))	{
27	 	 	 $ln	=	mysqli_real_escape_string
($dbc, $trimmed['last_name']);
28	 	 } else	{
29	 	 	 echo '<p class="error">Please enter
your last name!</p>';
30	 	 }
31	 	
32	 	 // Check for an email address:
33	 	 if (filter_var($trimmed['email'],
FILTER_VALIDATE_EMAIL))	{
34	 	 	 $e	=	mysqli_real_escape_string
($dbc, $trimmed['email']);
35	 	 } else	{
36	 	 	 echo '<p class="error">Please enter
a	valid email address!</p>';
37	 	 }
38	
39	 	 // Check for	a	password and match against the confirmed password:
40	 	 if (preg_match ('/^\w{4,20}$/', $trimmed['password1'])	)	{
41	 	 	 if ($trimmed['password1']	==	$trimmed['password2'])	{
42	 	 	 	 $p	=	mysqli_real_escape_string ($dbc, $trimmed['password1']);
43	 	 	 } else	{
44	 	 	 	 echo '<p class="error">Your password did not match the confirmed password!</p>';
45	 	 	 }
46	 	 } else	{
47	 	 	 echo '<p class="error">Please enter	a	valid password!</p>';
48	 	 }
49	 	
50	 	 if ($fn	&&	$ln	&&	$e	&&	$p)	{	// If everything's	OK...
51	
52	 	 	 // Make sure the email address	is	available:
53	 	 	 $q	=	"SELECT user_id FROM users WHERE email='$e'";
54	 	 	 $r	=	mysqli_query ($dbc, $q) or trigger_error("Query: $q\n<br />MySQL Error:	"	.	
mysqli_error($dbc));
55	 	 	
56	 	 	 if (mysqli_num_rows($r)	==	0)	{	// Available.
57	
58	 	 	 	 // Create the activation code:
59	 	 	 	 $a	=	md5(uniqid(rand( ), true));
60	
61	 	 	 	 // Add the user to the database:
62	 	 	 	 $q	=	"INSERT INTO users (email, pass, first_name, last_name, active, registration_
date) VALUES ('$e', SHA1('$p'), '$fn', '$ln', '$a', NOW( )	)";
63	 	 	 	 $r	=	mysqli_query ($dbc, $q) or trigger_error("Query: $q\n<br />MySQL Error:	"	.	
mysqli_error($dbc));
64	
65	 	 	 	 if (mysqli_affected_rows($dbc)	==	1)	{	// If it ran	OK.
66	
67	 	 	 	 	 // Send the email:
68	 	 	 	 	 $body	=	"Thank you for registering	at	<whatever site>. To activate your account,
please click on this link:\n\n";
69	 	 	 	 	 $body .= BASE_URL	.	'activate.php?x='	.	urlencode($e)	.	"&y=$a";
70	 	 	 	 	 mail($trimmed['email'], 'Registration Confirmation', $body, 'From: admin@sitename.
com');
71	 	 	 	 	
72	 	 	 	 	 // Finish the page:
73	 	 	 	 	 echo '<h3>Thank you for registering!	A	confirmation email has been sent to
your address. Please click on the link in that email in order to activate your
account.</h3>';
74	 	 	 	 	 include ('includes/footer.html'); // Include the HTML footer.
75	 	 	 	 	 exit(); // Stop the page.
76	 	 	 	 	
77	 	 	 	 } else	{	// If it did not run	OK.
78	 	 	 	 	 echo '<p class="error">You could not be registered due to	a	system error. We
apologize for any inconvenience.</p>';
79	 	 	 	 }
80	 	 	 	
81	 	 	 } else	{	//	The	email address	is	not available.
82	 	 	 	 echo '<p class="error">That email address has already been registered. If you have
forgotten your password, use the link	at	right to have your password sent to you.	
</p>';
83	 	 	 }
84	 	 	
85	 	 } else	{	// If one of the data tests failed.
86	 	 	 echo '<p class="error">Please try again.</p>';
87	 	 }
88	
89	 	 mysqli_close($dbc);
90	
91	 } // End of the main Submit conditional.
92	 ?>
93	 	
94	 <h1>Register</h1>
95	 <form action="register.php" method="post">
96	 	 <fieldset>
97	 	
98	 	 <p><b>First Name:</b> <input type="text" name="first_name" size="20" maxlength="20"
value="<?php if (isset($trimmed['first_name'])) echo $trimmed['first_name']; ?>" /></p>
99	 	
100	 	 <p><b>Last Name:</b> <input type="text" name="last_name" size="20" maxlength="40" value="<?php
if (isset($trimmed['last_name'])) echo $trimmed['last_name']; ?>" /></p>
101	
102	 	 <p><b>Email Address:</b> <input type="text" name="email" size="30" maxlength="60" value="<?php
if (isset($trimmed['email'])) echo $trimmed['email']; ?>" /> </p>
103	 	 	
104	 	 <p><b>Password:</b> <input type="password" name="password1" size="20" maxlength="20"
value="<?php if (isset($trimmed['password1'])) echo $trimmed['password1']; ?>" /> <small>Use
only letters, numbers, and the underscore. Must be between	4	and 20 characters long.	
</small></p>
105	
106	 	 <p><b>Confirm Password:</b> <input type="password" name="password2" size="20" maxlength="20"
value="<?php if (isset($trimmed['password2'])) echo $trimmed['password2']; ?>" /></p>
107	 	 </fieldset>
108	 	
109	 	 <div align="center"><input type="submit" name="submit" value="Register" /></div>
110	
111	 </form>
112	
113	 <?php include ('includes/footer.html'); ?>

ACTIVATE AN ACCOUNT:
Check out account.png

LOGGING IN AND OUT:
1	 <?php	#	Script 18.8	-	login.php
2	 //	This	is	the login page for the site.
3	 require	('includes/config.inc.php');
4	 $page_title	=	'Login';
5	 include	('includes/header.html');
6	
7	 if ($_SERVER['REQUEST_METHOD']	==	'POST')
{
8	 	 require	(MYSQL);
9	 	
10	 	 // Validate the email address:
11	 	 if (!empty($_POST['email']))	{
12	 	 	 $e	=	mysqli_real_escape_string
($dbc, $_POST['email']);
13	 	 } else	{
14	 	 	 $e	=	FALSE;
15	 	 	 echo '<p class="error">You forgot
to enter your email address!</p>';
16	 	 }
17	 	
18	 	 // Validate the password:
19	 	 if (!empty($_POST['pass']))	{
20	 	 	 $p	=	mysqli_real_escape_string
($dbc, $_POST['pass']);
21	 	 } else	{
22	 	 	 $p	=	FALSE;
23	 	 	 echo '<p class="error">You forgot
to enter your password!</p>';
24	 	 }
25	 	
26	 	 if ($e	&&	$p)	{	// If everything's	OK.
27	
28	 	 	 // Query the database:
29	 	 	 $q	=	"SELECT user_id, first_name,
user_level FROM users WHERE
(email='$e' AND pass=SHA1('$p')) AND
active IS NULL";		
30	 	 	 $r	=	mysqli_query ($dbc, $q)
or trigger_error("Query: $q\
n<br />MySQL Error:	"	.	
mysqli_error($dbc));
31	 	 	
32	 	 	 if (@mysqli_num_rows($r)	==	1)	{	
//	A	match was made.
33	
34	 	 	 	 // Register the values:
35	 	 	 	 $_SESSION	=	mysqli_fetch_array
($r, MYSQLI_ASSOC);
36	 	 	 	 mysqli_free_result($r);
37	 	 	 	 mysqli_close($dbc);
38	 	 	 	 	 	 	 	
39	 	 	 	 // Redirect the user:
40	 	 	 	 $url	=	BASE_URL	.	'index.php';
// Define the URL.
41	 	 	 	 ob_end_clean( ); // Delete the
buffer.
42	 	 	 	 header("Location: $url");
43	 	 	 	 exit( ); // Quit the script.
44	 	 	 	 	
45	 	 	 } else	{	// No match was made.
46	 	 	 	 echo '<p class="error">Either
the email address and password
entered do not match those
on file or you have not yet
activated your account.</p>';
47	 	 	 }
48	 	 	
49	 	 } else	{	// If everything wasn't	OK.
50	 	 	 echo '<p class="error">Please try
again.</p>';
51	 	 }
52	 	
53	 	 mysqli_close($dbc);
54	
55	 } // End of SUBMIT conditional.
56	 ?>
57	
58	 <h1>Login</h1>
59	 <p>Your browser must allow cookies in
order to log in.</p>
60	 <form action="login.php" method="post">
61	 	 <fieldset>
62	 	 <p><b>Email Address:</b> <input
type="text" name="email" size="20"
maxlength="60" /></p>
63	 	 <p><b>Password:</b> <input
type="password" name="pass" size="20"
maxlength="20" /></p>
64	 	 <div align="center"><input
type="submit" name="submit"
value="Login" /></div>
65	 	 </fieldset>
66	 </form>
67	
68	 <?php include ('includes/footer.html'); 
 ?>

 LOGOUT.PHP
1	 <?php	#	Script 18.9	-	logout.php
2	 //	This	is	the logout page for the site.
3	 require	('includes/config.inc.php');
4	 $page_title	=	'Logout';
5	 include	('includes/header.html');
6	
7	 // If no first_name session variable
exists, redirect the user:
8	 if	(!isset($_SESSION['first_name']))	{
9	
10	 	 $url	=	BASE_URL	.	'index.php'; //
Define the URL.
11	 	 ob_end_clean( ); // Delete the buffer.
12	 	 header("Location: $url");
13	 	 exit( ); // Quit the script.
14	 	
15	 } else	{	// Log out the user.
16	
17	 	 $_SESSION	=	array(); // Destroy the
variables.
18	 	 session_destroy( ); // Destroy the
session itself.
19	 	 setcookie (session_name( ), '',		
time( )-3600); // Destroy the cookie.
20	
21	 }
22	
23	 // Print	a	customized message:
24	 echo '<h3>You are now logged out.</h3>';
25	
26	 include ('includes/footer.html');
27	 ?>

PASSWORD MANAGEMENT:
1	 <?php	#	Script 18.10	-	forgot_password.
php
2	 //	This	page allows	a	user to reset
their password, if forgotten.
3	 require	('includes/config.inc.php');
4	 $page_title	=	'Forgot Your Password';
5	 include	('includes/header.html');
6	
7	 if ($_SERVER['REQUEST_METHOD']	==	'POST') {
8	 	 require	(MYSQL);
9	
10	 	 // Assume nothing:
11	 	 $uid	=	FALSE;
12	
13	 	 // Validate the email address...
14	 	 if (!empty($_POST['email']))	{
15	
16	 	 	 // Check for the existence of that
email address...
17	 	 	 $q	=	'SELECT user_id FROM
users WHERE email="'.		mysqli_
real_escape_string ($dbc, $_
POST['email'])	.	'"';
18	 	 	 $r	=	mysqli_query ($dbc, $q)
or trigger_error("Query: $q\
n<br />MySQL Error:	"	.	
mysqli_error($dbc));
19	 	 	
20	 	 	 if (mysqli_num_rows($r)	==	1)	{	//
Retrieve the user ID:
21	 	 	 	 list($uid)	=	mysqli_fetch_array
($r, MYSQLI_NUM);
22	 	 	 }	else	{	// No database match
made.
23	 	 	 	 echo '<p class="error">The
submitted email address does
not match those on file!</p>';
24	 	 	 }
25	 	 	
26	 	 } else	{	// No email!
27	 	 	 echo '<p class="error">You forgot
to enter your email address!</p>';
28	 	 } // End of empty($_POST['email']) IF.
29	 	
30	 	 if ($uid)	{	// If everything's	OK.
31	
32	 	 	 // Create	a	new, random password:
33	 	 	 $p	=	substr	(	md5(uniqid(rand( ),
true)), 3, 10);
34	
35	 	 	 // Update the database:
36	 	 	 $q	=	"UPDATE users SET pass=SHA1	
('$p') WHERE user_id=$uid LIMIT 1";
37	 	 	 $r	=	mysqli_query ($dbc, $q) or		
trigger_error("Query: $q\
n<br />MySQL Error:	"	.	
mysqli_error($dbc));
38	
39	 	 	 if (mysqli_affected_rows($dbc)	==	
1)	{	// If it ran	OK.
40	 	 	
41	 	 	 	 // Send an email:
42	 	 	 	 $body	=	"Your password to
log into <whatever site> has
been temporarily changed
to '$p'. Please log in using
this password and this email
address.	Then	you may change
your password to something
more familiar.";
43	 	 	 	 mail ($_POST['email'], 'Your
temporary password.', $body,
'From: admin@sitename.com');
44	 	 	 	
45	 	 	 	 // Print	a	message and wrap up:
46	 	 	 	 echo '<h3>Your password has
been changed. You will receive
the new, temporary password	at	
the email address with which
you registered. Once you have
logged in with this password,
you may change it by clicking
on the "Change Password"
link.</h3>';
47	 	 	 	 mysqli_close($dbc);
48	 	 	 	 include ('includes/footer.html');
49	 	 	 	 exit(); // Stop the script.
50	 	 	 	
51	 	 	 } else	{	// If it did not run	OK.
52	 	 	 	 echo '<p class="error">Your
password could not be
changed due to	a	system
error. We apologize for any
inconvenience.</p>';
53	 	 	 }
54
55	 	 }	else	{	// Failed the validation
test.
56	 	 	 echo '<p class="error">Please try
again.</p>';
57	 	 }
58	
59	 	 mysqli_close($dbc);
60	
61	 } // End of the main Submit conditional.
62	 ?>
63	
64	 <h1>Reset Your Password</h1>
65	 <p>Enter your email address below and
your password will be reset.</p>
66	 <form action="forgot_password.php"
method="post">
67	 	 <fieldset>
68	 	 <p><b>Email Address:</b> <input
type="text" name="email" size="20"
maxlength="60" value="<?php if
(isset($_POST['email'])) echo $_
POST['email']; ?>" /></p>
69	 	 </fieldset>
70	 	 <div align="center"><input
type="submit" name="submit"
value="Reset My Password" /></div>
71	 </form>
72	
73	 <?php include ('includes/footer.html');
?>

CHANGING PASSWORDS:
1	 <?php	#	Script 18.11	-	change_password.php
2	 //	This	page allows	a	logged-in user to
change their password.
3	 require	('includes/config.inc.php');
4	 $page_title	=	'Change Your Password';
5	 include	('includes/header.html');
6	
7	 // If no first_name session variable
exists, redirect the user:
8	 if	(!isset($_SESSION['user_id']))	{
9	 	
10	 	 $url	=	BASE_URL	.	'index.php';		
// Define the URL.
11	 	 ob_end_clean( ); // Delete the buffer.
12	 	 header("Location: $url");
13	 	 exit( ); // Quit the script.
14	 	
15	 }
16	
17	 if ($_SERVER['REQUEST_METHOD']	==	'POST') {
18	 	 require (MYSQL);
19	 	 	 	
20	 	 // Check for	a	new password and match
against the confirmed password:
21	 	 $p	=	FALSE;
22	 	 if (preg_match ('/^(\w){4,20}$/',		
$_POST['password1'])	)	{
23	 	 	 if ($_POST['password1']	==		
$_POST['password2'])	{
24	 	 	 	 $p	=	mysqli_real_escape_string
($dbc, $_POST['password1']);
25	 	 	 } else	{
26	 	 	 	 echo '<p class="error">Your
password did not match the
confirmed password!</p>';
27	 	 	 }
28	 	 } else	{
29	 	 	 echo '<p class="error">Please enter
a	valid password!</p>';
30	 	 }
31	 	
32	 	 if ($p)	{	// If everything's	OK.
33	
34	 	 	 // Make the query:
35	 	 	 $q	=	"UPDATE users SET
pass=SHA1('$p') WHERE user_id={$_
SESSION['user_id']} LIMIT 1";
36	 	 	 $r	=	mysqli_query ($dbc, $q)
or trigger_error("Query: $q\
n<br />MySQL Error:	"	.	
mysqli_error($dbc));
37	 	 	 if (mysqli_affected_rows($dbc)	==	
1)	{	// If it ran	OK.
38	
39	 	 	 	 // Send an email, if desired.
40	 	 	 	 echo '<h3>Your password has
been changed.</h3>';
41	 	 	 	 mysqli_close($dbc); // Close
the database connection.
42	 	 	 	 include ('includes/footer.
html'); // Include the HTML
footer.
43	 	 	 	 exit( );
44	 	 	 	
45	 	 	 } else	{	// If it did not run	OK.
46	 	 	
47	 	 	 	 echo '<p class="error">Your
password was not changed.
Make sure your new password
is	different than the current
password. Contact the system
administrator if you think an
error occurred.</p>';
48	
49	 	 	 }
50	
51	 	 }	else	{	// Failed the validation
test.
52	 	 	 echo '<p class="error">Please try
again.</p>';	 	
53	 	 }
54	 	
55	 	 mysqli_close($dbc); // Close the
database connection.
56	
57	 } // End of the main Submit conditional.
58	 ?>
59	
60	 <h1>Change Your Password</h1>
61	 <form action="change_password.php"
method="post">
62	 	 <fieldset>
63	 	 <p><b>New Password:</b> <input
type="password" name="password1"	
size="20" maxlength="20" /> <small>Use
only letters, numbers, and the
underscore. Must be between	4	and 20
characters long.</small></p>
64	 	 <p><b>Confirm New Password:</b> <input
type="password" name="password2"	
size="20" maxlength="20" /></p>
65	 	 </fieldset>
66	 	 <div align="center"><input
type="submit" name="submit"
value="Change My Password" /></div>
67	 </form>
68	
69	 <?php include ('includes/footer.html');
?>