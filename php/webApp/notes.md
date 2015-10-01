WEB APP DEVELOPMENT:

SENDING EMAILS:
One of my absolute favorite things about
PHP is how easy it is to send an email. On
a properly configured server, the process is
as simple as using the mail() function:
mail (to, subject, body, [headers]);
The to value should be an email address
or a series of addresses, separated by
commas. Any of these are allowed:
   email@example.com
   email1@example.com,
email2@example.com
   Actual Name <email@example.com>
   Actual Name <email@example.com>,
This Name <email2@example.com>
The subject value will create the email’s
subject line, and body is where you put the
contents of the email. To make things more
legible, variables are often assigned values
and then used in the mail() function call:
$to = 'email@example.com';
$subject = 'This is the subject';
$body = 'This is the body.
It goes over multiple lines.';
mail ($to, $subject, $body);
As you can see in the assignment to the
$body variable, you can create an email
message that goes over multiple lines
by having the text do exactly that within
the quotation marks. You can also use
the newline character (\n) within double
quotation marks to accomplish this:
$body = "This is the body.\nIt goes
➝ over multiple lines.";
This is all very straightforward, and there
are only a couple of caveats. First, the
subject line cannot contain the newline
character (\n). Second, each line of the body 
should be no longer than 70 characters
in length (this is more of a recommendation
than a requirement). You can
accomplish this using the wordwrap()
function. It will insert a newline into a string
every X number of characters. To wrap text
to 70 characters, use
$body = wordwrap($body, 70);
The mail() function takes a fourth, optional
parameter for additional headers. This is
where you could set the From, Reply-To, Cc,
Bcc, and similar settings. For example,
mail ($to, $subject, $body, 'From:
➝ reader@example.com');
To use multiple headers of different types
in your email, separate each with \r\n:
$headers = "From: John@example.com\
➝ r\n";
$headers .= "Cc: Jane@example.com,
➝ Joe@example.com\r\n";
mail ($to, $subject, $body, $headers);
Although this fourth argument is optional,
it is advised that you always include a
From value (although that can also be
established in PHP’s configuration file).
To use the mail() function, let’s create a
page that shows a contact form A and then
handles the form submission, validating the
data and sending it along in an email. This
example will also provide a nice tip you’ll
sometimes use on pages with sticky forms.
Note two things before running this
script: First, for this example to work, the
computer on which PHP is running must
have a working mail server. If you’re using
a hosted site, this shouldn’t be an issue;
on your own computer, you’ll likely need to
take preparatory steps (see the sidebar). I
will say in advance that these steps can be
daunting for the beginner; it will likely be
easiest and most gratifying to use a hosted
site for this particular script.
Second, this example, while functional,
could be manipulated by bad people,
allowing them to send spam through your
contact form (not just to you but to anyone).
The steps for preventing such attacks are
provided in Chapter 13, “Security Methods.”
Following along and testing this example is
just fine; relying upon it as your long-term
contact form solution is a bad idea.
EXERCISE:
7	 <body>
8	 <h1>Contact	Me</h1>
9	 <?php	#	Script 11.1	-	email.php
10	
11	 // Check for form submission:
12	 if ($_SERVER['REQUEST_METHOD']	==	'POST') {
13	
14	 	 // Minimal form validation:
15	 	 if (!empty($_POST['name'])	&&	!empty	
($_POST['email'])	&&	!empty($_POST	
['comments'])	)	{
16	 	
17	 	 	 // Create the body:
18 $body = "Name: {$_POST['name']}\n
 \nComments: {$_POST['comments']}";
19	
20	 	 	 // Make it no longer than 70
characters long:
21 $body = wordwrap($body, 70);
22	 	
23	 	 	 // Send the email:
24 mail('your_email@example.com',
 'Contact Form Submission',
 $body, "From: {$_POST['email']}");
25	
26	 	 	 // Print	a	message:
27	 	 	 echo '<p><em>Thank you for
contacting me.	I	will reply some
day.</em></p>';
28	 	 	
29	 	 	 // Clear $_POST (so that the form's
not sticky):
30	 	 	 $_POST	=	array( );
31	 	
32	 	 } else	{
33	 	 	 echo '<p style="font-weight: bold;
color: #C00">Please fill out the
form completely.</p>';
34	 	 }
35	 	
36	 } // End of main	isset( )	IF.
37	
38	 // Create the HTML form:
39	 ?>
40	 <p>Please fill out this form to contact
me.</p>
41	 <form action="email.php" method="post">
42	 	 <p>Name: <input type="text"
name="name" size="30" maxlength="60"
value="<?php if (isset($_POST['name']))
echo $_POST['name']; ?>" /></p>
43	 	 <p>Email Address: <input type="text"
name="email" size="30" maxlength="80"
value="<?php if (isset($_POST['email']))
echo $_POST['email']; ?>" /></p>
44	 	 <p>Comments: <textarea name="comments"
rows="5" cols="30"><?php if (isset	
($_POST['comments'])) echo $_POST	
['comments']; ?></textarea></p>
45	 	 <p><input type="submit" name="submit"
value="Send!" /></p>
46	 </form>
47	 </body>

HANDLING FILE UPLOADS (SEE upload.png): 
Chapters 2, “Programming with PHP,”
and 3, “Creating Dynamic Web Sites,” go
over the basics of handling HTML forms
with PHP. For the most part, every type of
form element can be handled the same
in PHP, with one exception: file uploads.
The process of uploading a file has two
dimensions. First the HTML form must be
displayed, with the proper code to allow for
file uploads. Upon submission of the form,
the server will first store the uploaded file
in a temporary directory, so the next step is
for the PHP script to copy the uploaded file
to its final destination.
EXERCISE:
13	 <body>
14	 <?php	#	Script 11.2	-	upload_image.php
15	
16	 // Check if the form has been submitted:
17	 if ($_SERVER['REQUEST_METHOD']	==	'POST') {
18	
19	 	 // Check for an uploaded file:
20	 	 if (isset($_FILES['upload']))	{
21	 	 	
22	 	 	 // Validate the type. Should be
JPEG or PNG.
23	 	 	 $allowed	=	array ('image/pjpeg',
'image/jpeg', 'image/JPG', 'image/
X-PNG', 'image/PNG', 'image/png',
'image/x-png');
24	 	 	 if (in_array($_FILES['upload'] ['type'],	$allowed))	{
25	 	 	
26	 	 	 	 // Move the file over.
27	 	 	 	 if (move_uploaded_file		
($_FILES['upload']['tmp_name'],
"../uploads/{$_FILES['upload']
['name']}"))	{
28	 	 	 	 	 echo '<p><em>The file has
been uploaded!</em></p>';
29	 	 	 	 } // End of move... IF.
30	 	 	 	
31	 	 	 } else	{	// Invalid type.
32	 	 	 	 echo '<p class="error">Please
upload	a	JPEG or PNG image.</p>';
33	 	 	 }
34	
35	 	 } // End of	isset($_FILES['upload'])	IF.
36	 	
37	 	 // Check for an error:
38	 	 if ($_FILES['upload']['error']	>	0)	{
39	 	 	 echo '<p class="error">The file could
not be uploaded because: <strong>';
40	 	
41	 	 	 // Print	a	message based upon the
error.
42	 	 	 switch ($_FILES['upload']['error']) {
43	 	 	 	 case 1:
44	 	 	 	 	 print 'The file exceeds the
upload_max_filesize setting
in php.ini.';
45	 	 	 	 	 break;
46	 	 	 	 case 2:
47	 	 	 	 	 print 'The file exceeds the
MAX_FILE_SIZE setting in the
HTML form.';
48	 	 	 	 	 break;
49	 	 	 	 case 3:
50	 	 	 	 	 print 'The file was only
partially uploaded.';
51	 	 	 	 	 break;
52	 	 	 	 case 4:
53	 	 	 	 	 print 'No file was uploaded.';
54	 	 	 	 	 break;
55	 	 	 	 case 6:
56	 	 	 	 	 print 'No temporary folder
was available.';
57	 	 	 	 	 break;
58	 	 	 	 case 7:
59	 	 	 	 	 print 'Unable to write to
the disk.';
60	 	 	 	 	 break;
61	 	 	 	 case 8:
62	 	 	 	 	 print 'File upload stopped.';
63	 	 	 	 	 break;
64	 	 	 	 default:
65	 	 	 	 	 print 'A system error
occurred.';
66	 	 	 	 	 break;
67	 	 	 } // End of switch.
68	 	 	
69	 	 	 print '</strong></p>';
70	 	
71	 	 } // End of error IF.
72	 	
73	 	 // Delete the file if it still exists:
74	 	 if (file_exists ($_FILES['upload']
['tmp_name'])	&&	is_file($_FILES	
['upload']['tmp_name'])	)	{
75	 	 	 unlink ($_FILES['upload']
['tmp_name']);
76	 	 }
77	 	 	 	
78	 } // End of the submitted conditional.
79	 ?>
80	 	
81	 <form enctype="multipart/form-data"
action="upload_image.php" method="post">
82	
83	 	 <input type="hidden" name="MAX_FILE_
SIZE" value="524288" />
84	 	
85	 	 <fieldset><legend>Select	a	JPEG or
PNG image of 512KB or smaller to be
uploaded:</legend>
86	 	
87	 	 <p><b>File:</b> <input type="file"
name="upload" /></p>
88	 	
89	 	 </fieldset>
90	 	 <div align="center"><input type="submit"
name="submit" value="Submit" /></div>
91	
92	 </form>
93	 </body>

ADDING JAVASCIPT:
EXERCISE:
1	 //	Script 11.3	-	function.js
2	
3	 //	Make	a	pop-up window function:
4	 function create_window (image, width,
height)	{
5	
6	 	 // Add some pixels to the width and
height:
7	 	 width	=	width	+	10;
8	 	 height	=	height	+	10;
9	 	
10	 	 // If the window	is	already open,
11	 	 // resize it to the new dimensions:
12	 	 if (window.popup	&&	!window.popup.
closed)	{
13	 	 	 window.popup.resizeTo(width,	height);
14	 	 }
15	 	
16	 	 // Set the window properties:
17	 	 var specs	=	"location=no,
scrollbars=no, menubars=no,
toolbars=no, resizable=yes,		
left=0, top=0, width="	+	width	+	",
height="	+	height;
18	 	
19	 	 // Set the URL:
20	 	 var url	=	"show_image.php?image="	+	
image;
21	 	
22	 	 // Create the pop-up window:
23	 	 popup = window.open(url, "ImageWindow",
specs);
24	 	 popup.focus( );
25	 	
26	 } // End of function.
FULL SCRIPT:
<body>
<p>Click on an image to view it in	a	
separate window.</p>
10	 <ul>
11	 <?php	#	Script 11.4	-	images.php
12	 //	This	script lists the images in the
uploads directory.
13	
14	 $dir	=	'../uploads'; // Define the
directory to view.
15	
16	 $files	=	scandir($dir); // Read all the
images into an array.
17	
18	 // Display each image caption as	a	link
to the JavaScript function:
19	 foreach ($files as $image)	{
20	
21	 	 if (substr($image, 0, 1) != '.')	{	//
Ignore anything starting with	a	period.
22	 	
23	 	 	 // Get the image's size in pixels:
24	 	 	 $image_size	=	getimagesize
("$dir/$image");
25	
26	 	 	 // Make the image's name URL-safe:
27	 	 	 $image_name	=	urlencode($image);
28	 	 	
29	 	 	 // Print the information:
30	 	 	 echo "<li><a href=\"javascript:	
	 	 	 create_window('$image_name',	
	 	 	 $image_size[0],$image_size[1])\">	
	 	 	 $image</a></li>\n";
31	 	
32	 	 } // End of the IF.
33	 	
34	 } // End of the foreach loop.
35	 ?>
36	 </ul>
37	 </body>
For this process to work, several things
must be in place:
n	 PHP must run with the correct settings.
n	 A temporary storage directory must
exist with the correct permissions.
n	 The final storage directory must exist
with the correct permissions.
With this in mind, this next section will
cover the server setup to allow for file
uploads; then a PHP script will be created
that actually does the uploading.
Allowing for file uploads
As I said, certain settings must be established
in order for PHP to be able to handle file
uploads. I’ll first discuss why or when you’d
need to make these adjustments before
walking you through the steps.
The first issue is PHP itself. There are
several settings in PHP’s configuration file
(php.ini) that dictate how PHP handles
uploads, specifically stating how large of a
file can be uploaded and where the upload
should temporarily be stored (Table 11.1).
Generally speaking, you’ll need to edit this
file if any of these conditions apply:
n	 file_uploads is disabled.
n	 PHP has no temporary directory to use.
n	 You will be uploading very large files
(larger than 2MB).
If you don’t have access to your php.ini
file—like if you’re using a hosted site—
presumably the host has already configured
PHP to allow for file uploads.
The second issue is the location of, and
permissions on, the temporary directory.
This is where PHP will store the uploaded
file until your PHP script moves it to its final
destination. If you installed PHP on your
own Windows computer, you might need to
take steps here. Mac OS X and Unix users
need not worry about this, as a temporary
directory already exists for such purposes
(namely, a special directory called /tmp).
Finally, the destination folder must be
created and have the proper permissions
established on it. This is a step that everyone
must take for every application that handles
file uploads. Because there are important
security issues involved in this step, please
also make sure that you read and understand
the sidebar, “Secure Folder Permissions.” 

UNDERSTANDING HTTP HEADERS:
The images.php script, just created, displays
a list of image names, each of which is linked
to a JavaScript function call. That JavaScript
function creates a pop-up window which
loads a PHP script that will actually reveal
the image. This may sound like a lot of work
for little effort, but there’s a method to my
madness. A trivial reason for this approach is
that JavaScript is required in order to create
a window sized to fit the image (as opposed
to creating a pop-up window of any size,
with the image in it). More importantly,
because the images are being stored in the
uploads directory, ideally stored outside of
the Web root directory, the images cannot
be viewed directly in the Web browser using
either of the following:
http://www.example.com/uploads/
➝ image.png
or
<img src="image.png" />
The reason why neither of the above
will work is that files and folders located
outside of the Web root directory are, by
definition, unavailable via a Web browser.
This is actually a good thing, because it
allows you to safeguard content, providing
it only when appropriate. To make that
content available through a Web browser,
you need to create a proxy script in PHP.
A proxy script just fulfills a role, such as
providing a file (displaying an image is
actually the same thing as providing a
file to the browser). Thus, given the proxy
script proxy.php, the above examples
could be made to work using either A:
http://www.example.com/proxy.php?
➝ image=image.png
or
<img src="proxy.php?image=image.png" />
This, of course, is exactly what’s being
done with show_image.php, linked in the
create_window() JavaScript function. But
how does proxy.php, or show_image.php,
work? The answer lies in an understanding
of HTTP headers.
HTTP (Hypertext Transfer Protocol) is the
technology at the heart of the World Wide
Web and defines the way clients and
servers communicate (in layman’s terms).
When a browser requests a Web page,
it receives a series of HTTP headers in
return. This happens behind the scenes;
most users aren’t aware of this at all.
PHP’s built-in header() function can be
used to take advantage of this protocol.
The most common example of this will be
demonstrated in the next chapter, when
the header() function will be used to
redirect the Web browser from the current
page to another. Here, you’ll use it to send
files to the Web browser.
In theory, the header() function is easy to
use. Its syntax is
header(header string);
The list of possible header strings is
quite long, as headers are used for everything
from redirecting the Web browser,
to sending files, to creating cookies, to
controlling page caching, and much, much
more. Starting with something simple, to
B Firefox prompts the user
to download the file because
of the attachment ContentDisposition
value.
use header() to redirect the Web
browser, type
header ('Location: http://www.
➝ example.com/page.php');
That line will send the Web browser from
the page it’s on over to that other URL. You’ll
see examples of this in the next chapter.
In this next example, which will send an
image file to the Web browser, three header
calls are used. The first is Content-Type.
This is an indication to the Web browser
of what kind of data is about to follow. The
Content-Type value matches the data’s
MIME type. This line lets the browser know
it’s about to receive a PDF file:
header("Content-Type:application/
➝ pdf\n");
Next, you can use Content-Disposition,
which tells the browser how to treat the data:
header ("Content-Disposition:
➝ attachment; filename=\
➝ "somefile.pdf\"\n");
The attachment value will prompt the
browser to download the file B. An alternative is to use inline, which tells the
browser to display the data, assuming that
the browser can. The filename attribute
is just that: it tells the browser the name
associated with the data. Some browsers
abide by this instruction, others do not.
A third header to use for downloading files
is Content-Length. This is a value, in bytes,
corresponding to the amount of data to
be sent.
header ("Content-Length: 4096\n");
That’s the basics with respect to using the
header() function. Before getting to the
example, note that if a script uses multiple
header() calls, each should be terminated
by a newline (\n) as in the preceding
code snippets. More importantly, the
absolutely critical thing to remember about
the header() function is that it must be
called before anything is sent to the Web
browser. This includes HTML or even blank
spaces. If your code has any echo or print
statements, has blank lines outside of PHP
tags, or includes files that do any of these
things before calling header(), you’ll see
an error message like that in.
EXERCISE:
<?php // dhow_image.php

	$name = False;

	if (isset($_GET['image'])) {
// Make sure it has an image's
extension:
10	 	 $ext	=	strtolower	(	substr ($_GET	
['image'], -4));
11	 	
12	 	 if (($ext	==	'.jpg') OR ($ext	==	
'jpeg') OR ($ext	==	'.png'))	{
13	
14	 	 	 // Full image path:
15	 	 	 $image	=	"../uploads/{$_GET['image']}";
16	
17	 	 	 // Check that the image exists and
is	a	file:
18	 	 	 if (file_exists ($image)	&&		
(is_file($image)))	{
19	 	 	 	
20	 	 	 	 // Set the name as this image:
21	 	 	 	 $name	=	$_GET['image'];	
22	
23	 	 	 } // End of file_exists()	IF.
24	
25	 	 } // End of $ext IF.
26	 	
27	 } // End of	isset($_GET['image'])	IF.
28	
29	 // If there was	a	problem, use the
default image:
30	 if (!$name)	{
31	 	 $image	=	'images/unavailable.png';	
32	 	 $name	=	'unavailable.png';
33	 }
34	
35	 // Get the image information:
36	 $info	=	getimagesize($image);
37	 $fs	=	filesize($image);
38	
39	 // Send the content information:
40	 header ("Content-Type: {$info['mime']}\n");
41	 header ("Content-Disposition: inline;
filename=\"$name\"\n");
42	 header ("Content-Length: $fs\n");
43	
44	 // Send the file:
45	 readfile ($image);

DATE AND TIME FUNCTIONS:
Chapter 5, “Introduction to SQL,”
demonstrates a handful of great date
and time functions that MySQL supports.
Naturally, PHP has its own date and time
functions. To start, there’s date_default_
timezone_set(). This function is used to
establish the default time zone (which can
also be set in PHP’s configuration file).
date_default_timezone_set(tz);
The tz value is a string like America/New_
York or Pacific/Auckland. There are too many
to list here (Africa alone has over 50), but see
the PHP manual for them all. Note that as of
PHP 5.1, the default time zone must be set,
either in a script or in PHP’s configuration
file, prior to calling any of the date and time
functions, or else you’ll see an error.
Next up, the checkdate() function takes
a month, a day, and a year and returns a
Boolean value indicating whether that date
actually exists (or existed). It even takes
into account leap years. This function can
be used to ensure that a user supplied a
valid date (birth date or other):
if (checkdate(month, day, year)) { // OK!
Perhaps the most frequently used function
is the aptly named date(). It returns the
date and/or time as a formatted string. It
takes two arguments:
date (format, [timestamp]);
The timestamp is an optional argument
representing the number of seconds since
the Unix Epoch (midnight on January 1,
1970) for the date in question. It allows you
to get information, like the day of the week,
for a particular date. If a timestamp is not
specified, PHP will just use the current time on the server.
EXERCISE:
1	 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/
xhtml1-transitional.dtd">
2	 <html	xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
3	 <head>
4	 	 <meta	http-equiv="Content-Type" content="text/html; charset=utf-8" />
5	 	 <title>Images</title>
6	 	 <script	type="text/javascript" charset="utf-8" src="js/function.js"></script>
7	 </head>
8	 <body>
9	 <p>Click	on an image to view it in	a	separate window.</p>
10	 <ul>
11	 <?php	#	Script 11.6	-	images.php
12	 //	This	script lists the images in the uploads directory.
13	 //	This	version now shows each image's file size and uploaded date and time.
14	
15	 // Set the default timezone:
16 date_default_timezone_set ('America/New_York');
17	
18	 $dir	=	'../uploads'; // Define the directory to view.
19	
20	 $files	=	scandir($dir); // Read all the images into an array.
21	
22	 // Display each image caption as	a	link to the JavaScript function:
23	 foreach ($files as $image)	{
24	
25	 	 if (substr($image, 0, 1) != '.')	{	// Ignore anything starting with	a	period.
26	 	
27	 	 	 // Get the image's size in pixels:
28	 	 	 $image_size	=	getimagesize ("$dir/$image");
29	 	 	
30	 	 	 // Calculate the image's size in kilobytes:
31 $file_size = round ( (filesize ("$dir/$image")) / 1024) . "kb";
32	 	 	
33	 	 	 // Determine the image's upload date and time:
34 $image_date = date("F d, Y H:i:s", filemtime("$dir/$image"));
35	 	 	
36	 	 	 // Make the image's name URL-safe:
37	 	 	 $image_name	=	urlencode($image);
38	 	 	
39	 	 	 // Print the information:
40 echo "<li><a href=\"javascript:create_window('$image_name',$image_size[0],
 $image_size[1])\">$image</a> $file_size ($image_date)</li>\n";
41	 	
42	 	 } // End of the IF.
43	 	
44	 } // End of the foreach loop.
45	
46	 ?>
47	 </ul>
48	 </body>
49	 </html>

SESSIONS:
EXERCISE:
1	 <?php	#	Script 12.1	-	login_page.inc.php
2	 //	This	page prints any errors
associated with logging in
3	 // and it creates the entire login page,
including the form.
4	
5	 //	Include the header:
6	 $page_title	=	'Login';
7	 include	('includes/header.html');
8	
9	 // Print any error messages, if they exist:
10	 if (isset($errors)	&&	!empty($errors))	{
11	 	 echo '<h1>Error!</h1>
12	 	 <p class="error">The following
error(s) occurred:<br />';
13	 	 foreach ($errors as $msg)	{
14	 	 	 echo	"	-	$msg<br />\n";
15	 	 }
16	 	 echo '</p><p>Please try again.</p>';
17	 }
18	
19	 // Display the form:
20	 ?><h1>Login</h1>
21	 <form action="login.php" method="post">
22	 	 <p>Email Address: <input type="text"
name="email" size="20" maxlength="60" />
</p>
23	 	 <p>Password: <input type="password"
name="pass" size="20" maxlength="20" />	
</p>
24	 	 <p><input type="submit" name="submit"
value="Login" /></p>
25	 </form>
26	
27	 <?php include ('includes/footer.html');
?>

Making the Login Functions:
1	 <?php	#	Script 12.2	-	login_functions.
inc.php
2	 //	This	page defines two functions used
by the login/logout process.
3	
4	 /*	This	function determines an absolute
URL and redirects the user there.
5	 	*	The	function takes one argument: the
page to be redirected to.
6	 	*	The	argument defaults to index.php.
7	 	*/
8	 function redirect_user ($page	=	'index.
php')	{
9	
10	 	 // Start defining the URL...
11	 	 // URL	is	http:// plus the host name
plus the current directory:
12	 	 $url	=	'http://'	.	$_SERVER['HTTP_
HOST']	.	dirname($_SERVER['PHP_SELF']);
13	 	
14	 	 // Remove any trailing slashes:
15	 	 $url	=	rtrim($url, '/\\');
16	 	
17	 	 // Add the page:
18	 	 $url .= '/'	.	$page;
19	 	
20	 	 // Redirect the user:
21	 	 header("Location: $url");
22	 	 exit(); // Quit the script.
23	
24	 } // End of redirect_user( )	function.
25	
26	
27	 /*	This	function validates the form data
(the email address and password).
28	 	*	If both are present, the database	is	
queried.
29	 	*	The	function requires	a	database
connection.
30	 	*	The	function returns an array of
information, including:
31	 	*	-	a	TRUE/FALSE variable indicating
success
32	 	*	-	an array of either errors or the
database result
33	 */
34	 function check_login($dbc, $email	=	'',
$pass	=	'')	{
35	
36	 	 $errors	=	array(); // Initialize
error array.
37	
38	 	 // Validate the email address:
39	 	 if (empty($email))	{
40	 	 	 $errors[]	=	'You forgot to enter
your email address.';
41	 	 } else	{
42	 	 	 $e	=	mysqli_real_escape_
string($dbc, trim($email));
43	 	 }
44	
45	 	 // Validate the password:
46	 	 if (empty($pass))	{
47	 	 	 $errors[]	=	'You forgot to enter
your password.';
48	 	 } else	{
49	 	 	 $p	=	mysqli_real_escape_
string($dbc, trim($pass));
50	 	 }
51	
52	 	 if (empty($errors))	{	// If
everything's	OK.
53	
54	 	 	 // Retrieve the user_id and
first_name for that email/password
combination:
55	 	 	 $q	=	"SELECT user_id, first_name
FROM users WHERE email='$e' AND
pass=SHA1('$p')";		
56	 	 	 $r	=	@mysqli_query ($dbc, $q);		
// Run the query.
57	 	 	
58	 	 	 // Check the result:
59	 	 	 if (mysqli_num_rows($r)	==	1)	{
60	
61	 	 	 	 // Fetch the record:
62	 	 	 	 $row	=	mysqli_fetch_array ($r,
MYSQLI_ASSOC);
63	 	
64	 	 	 	 // Return true and the record:
65	 	 	 	 return array(true, $row);
66	 	 	 	
67	 	 	 } else	{	// Not	a	match!
68	 	 	 	 $errors[]	=	'The email address
and password entered do not
match those on file.';
69	 	 	 }
70	 	 	
71	 	 } // End of empty($errors) IF.
72	 	
73	 	 // Return false and the errors:
74	 	 return array(false, $errors);
75	
76	 } // End of check_login( )	function
?>

USING COOKIES:
1	 <?php	#	Script 12.3	-	login.php
2	 //	This	page processes the login form
submission.
3	 // Upon successful login, the user	is	
redirected.
4	 //	Two included files are necessary.
5	 // Send NOTHING to the Web browser prior
to the setcookie( )	lines!
6	
7	 //	Check if the form has been submitted:
8	 if ($_SERVER['REQUEST_METHOD']	==	'POST') {
9	
10	 	 // For processing the login:
11	 	 require ('includes/login_functions.
inc.php');
12	 	
13	 	 // Need the database connection:
14	 	 require ('../mysqli_connect.php');
15	 	 	
16	 	 // Check the login:
17	 	 list ($check, $data) = check_login($dbc,
$_POST['email'], $_POST['pass']);
18	 	
19	 	 if ($check)	{	//	OK!
20	 	 	
21	 	 	 // Set the cookies:
22 setcookie ('user_id',
 $data['user_id']);
23 setcookie ('first_name',
 $data['first_name']);
24	 	 	
25	 	 	 // Redirect:
26	 	 	 redirect_user('loggedin.php');
27	 	 	 	
28	 	 } else	{	// Unsuccessful!
29	
30	 	 	 // Assign $data to $errors for
error reporting
31	 	 	 // in the login_page.inc.php file.
32	 	 	 $errors	=	$data;
33	
34	 	 }
35	 	 	
36	 	 mysqli_close($dbc); // Close the
database connection.
37	
38	 } // End of the main submit conditional.
39	
40	 // Create the page:
41	 include ('includes/login_page.inc.php');
42	 ?>

loggedin.php:
1	 <?php	#	Script 12.4	-	loggedin.php
2	 //	The	user	is	redirected here from
login.php.
3	
4	 // If no cookie	is	present, redirect the
user:
5 if (!isset($_COOKIE['user_id'])) {
6	
7	 	 //	Need the functions:
8	 	 require ('includes/login_functions.
inc.php');
9	 	 redirect_user( );	
10	
11	 }
12	
13	 // Set the page title and include the
HTML header:
14	 $page_title	=	'Logged In!';
15	 include ('includes/header.html');
16	
17	 // Print	a	customized message:
18	 echo "<h1>Logged In!</h1>
19 <p>You are now logged in, {$_COOKIE
['first_name']}!</p>
20	 <p><a href=\"logout.php\">Logout</a></p>";
21	
22	 include ('includes/footer.html');
?>

logout.php
1	 <?php	#	Script 12.6	-	logout.php
2	 //	This	page lets the user logout.
3	
4	 // If no cookie	is	present, redirect the
user:
5	 if	(!isset($_COOKIE['user_id']))	{
6	
7	 	 //	Need the function:
8	 	 require ('includes/login_functions.
inc.php');
9	 	 redirect_user( );	
10	 	
11	 } else	{	// Delete the cookies:
12 setcookie ('user_id', '', time()-3600,
 '/', '', 0, 0);
13 setcookie ('first_name', '',
 time()-3600, '/', '', 0, 0);
14	 }
15	
16	 // Set the page title and include the
HTML header:
17	 $page_title	=	'Logged Out!';
18	 include ('includes/header.html');
19	
20	 // Print	a	customized message:
21	 echo "<h1>Logged Out!</h1>
22	 <p>You are now logged out, {$_COOKIE	
	 ['first_name']}!</p>";
23	
24	 include ('includes/footer.html');
25	 ?>

create the logout link:
1	 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML
1.0 Strict//EN" "http://www.w3.org/TR/
xhtml1/DTD/xhtml1-strict.dtd">
2	 <html xmlns="http://www.w3.org/1999/
xhtml">
3	 <head">
4	 	 <title><?php echo $page_title; ?>	
</title>	
5	 	 <link rel="stylesheet" href="includes/
style.css" type="text/css"
media="screen" />
6	 	 <meta http-equiv="content-type"
content="text/html; charset=utf-8" />
7	 </head>
8	 <body>
9	 	 <div	id="header">
10	 	 	 <h1>Your Website</h1>
11	 	 	 <h2>catchy slogan...</h2>
12	 	 </div>
13	 	 <div id="navigation">
14	 	 	 <ul>
15	 	 	 	 <li><a href="index.php">Home
Page</a></li>
16	 	 	 	 <li><a href="register.
php">Register</a></li>
17	 	 	 	 <li><a href="view_users.
php">View Users</a></li>
18	 	 	 	 <li><a href="password.
php">Change Password</a></li>
19 <li><?php // Create a login/
logout link:
20 if ( (isset($_COOKIE['user_id']))
&& (basename($_SERVER['PHP_SELF'])
!= 'logout.php') ) {
21 echo '<a href="logout.php">Logout
 </a>';
22 } else {
23 echo '<a href="login.php">Login</a>';
24 }
25 ?></li>
26	 	 	 </ul>
27	 	 </div>
28	 	 <div id="content"><!-- Start of the
page-specific content. -->
29	 <!-- Script 12.7	-	header.html -->

using Sessions:
1	 <?php	#	Script 12.8	-	login.php #3
2	 //	This	page processes the login form
submission.
3	 //	The	script now uses sessions.
4	
5	 //	Check if the form has been submitted:
6	 if ($_SERVER['REQUEST_METHOD']	==	'POST') {
7	
8	 	 //	Need two helper files:
9	 	 require ('includes/login_functions.
inc.php');
10	 	 require ('../mysqli_connect.php');
11	 	 	
12	 	 // Check the login:
13	 	 list ($check, $data) = check_login($dbc,
$_POST['email'], $_POST['pass']);
14	 	
15	 	 if ($check)	{	//	OK!
16	 	 	
17	 	 	 // Set the session data:
18 session_start();
19 $_SESSION['user_id'] =
 $data'user_id'];
20 $_SESSION['first_name'] =
 $data['first_name'];
21	 	 	
22	 	 	 // Redirect:
23	 	 	 redirect_user('loggedin.php');
24	 	 	 	
25	 	 } else	{	// Unsuccessful!
26	
27	 	 	 // Assign $data to $errors for
login_page.inc.php:
28	 	 	 $errors	=	$data;
29	
30	 	 }
31	 	 	
32	 	 mysqli_close($dbc); // Close the
database connection.
33	
34	 } // End of the main submit conditional.
35	
36	 // Create the page:
37	 include ('includes/login_page.inc.php');
38	 ?>

...
1	 <?php	#	Script 12.9	-	loggedin.php #2
2	 //	The	user	is	redirected here from
login.php.
3	
4 session_start(); // Start the session.
5	
6	 // If no session value	is	present,
redirect the user:
7 if (!isset($_SESSION['user_id'])) {
8	
9	 	 //	Need the functions:
10	 	 require ('includes/login_functions.
inc.php');
11	 	 redirect_user( );	
12	
13	 }
14	
15	 // Set the page title and include the
HTML header:
16	 $page_title	=	'Logged In!';
17	 include ('includes/header.html');
18	
19	 // Print	a	customized message:
20	 echo "<h1>Logged In!</h1>
21 <p>You are now logged in, {$_SESSION
['first_name']}!</p>
22	 <p><a href=\"logout.php\">Logout</a></p>";
23	
24	 include ('includes/footer.html');
25	 ?>

header.html:
1	 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML
1.0 Strict//EN" "http://www.w3.org/TR/
xhtml1/DTD/xhtml1-strict.dtd">
2	 <html xmlns="http://www.w3.org/1999/xhtml">
3	 <head">
4	 	 <title><?php echo $page_title; ?>	
</title>	
5	 	 <link rel="stylesheet" href="includes/
style.css" type="text/css"
media="screen" />
6	 	 <meta http-equiv="content-type"
content="text/html; charset=utf-8" />
7	 </head>
8	 <body>
9	 	 <div	id="header">
10	 	 	 <h1>Your Website</h1>
11	 	 	 <h2>catchy slogan...</h2>
12	 	 </div>
13	 	 <div id="navigation">
14	 	 	 <ul>
15	 	 	 	 <li><a href="index.php">Home
Page</a></li>
16	 	 	 	 <li><a href="register.php">	
Register</a></li>
17	 	 	 	 <li><a href="view_users.php">	
View Users</a></li>
18	 	 	 	 <li><a href="password.php">	
Change Password</a></li>
19	 	 	 	 <li><?php // Create	a	login/
logout link:
20 if (isset($_SESSION['user_id'])) {
21	 	 echo '<a href="logout.php">Logout</a>';
22	 } else	{
23	 	 echo '<a href="login.php">Login</a>';
24	 }
25	 ?></li>
26	 	 	 </ul>
27	 	 </div>
28	 	 <div id="content"><!-- Start of the
page-specific content. -->
29	 <!-- Script 12.10	-	header.html -->


1	 <?php	#	Script 12.11	-	logout.php #2
2	 //	This	page lets the user logout.
3	 //	This	version uses sessions.
4	
5 session_start(); // Access the
existing session.
6	
7	 // If no session variable exists,
redirect the user:
8 if (!isset($_SESSION['user_id']))	{
9	
10	 	 // Need the functions:
11	 	 require ('includes/login_functions.
inc.php');
12	 	 redirect_user( );	
13	 	
14	 } else	{	// Cancel the session:
15	
16 $_SESSION = array(); // Clear the
 variables.
17 session_destroy(); // Destroy the
 session itself.
18 setcookie ('PHPSESSID', '', time()-3600,
 '/', '', 0, 0); // Destroy the cookie.
19	
20	 }
21	
22	 // Set the page title and include the
HTML header:
23	 $page_title	=	'Logged Out!';
24	 include ('includes/header.html');
25	
26	 // Print	a	customized message:
27	 echo "<h1>Logged Out!</h1>
28 <p>You are now logged out!</p>";
29	
30	 include ('includes/footer.html');
31	 ?>

improving Session Security:
1	 <?php	#	Script 12.12	-	login.php #4
2	 //	This	page processes the login form
submission.
3	 //	The	script now stores the HTTP_USER_
AGENT value for added security.
4	
5	 //	Check if the form has been submitted:
6	 if	($_SERVER['REQUEST_METHOD']	==	'POST')
{
7	
8	 	 //	Need two helper files:
9	 	 require ('includes/login_functions.
inc.php');
10	 	 require ('../mysqli_connect.php');
11	 	 	
12	 	 // Check the login:
13	 	 list ($check, $data) = check_login($dbc,
$_POST['email'], $_POST['pass']);
14	 	
15	 	 if ($check)	{	//	OK!
16	 	 	
17	 	 	 // Set the session data:
18	 	 	 session_start( );
19	 	 	 $_SESSION['user_id']	=	
$data['user_id'];
20	 	 	 $_SESSION['first_name']	=	
$data['first_name'];
21	 	 	
22	 	 	 // Store the HTTP_USER_AGENT:
23 $_SESSION['agent'] = md5($_SERVER
 ['HTTP_USER_AGENT']);
24	
25	 	 	 // Redirect:
26	 	 	 redirect_user('loggedin.php');
27	 	 	 	
28	 	 } else	{	// Unsuccessful!
29	
30	 	 	 // Assign $data to $errors for		
	 	 	 login_page.inc.php:
31	 	 	 $errors	=	$data;
32	
33	 	 }
34	 	 	
35	 	 mysqli_close($dbc); // Close the
database connection.
36	
37	 } // End of the main submit conditional.
38	
39	 // Create the page:
40	 include ('includes/login_page.inc.php');
41	 ?>

loggedin.php:
1	 <?php	#	Script 12.13	-	loggedin.php #3
2	 //	The	user	is	redirected here from
login.php.
3	
4	 session_start( ); // Start the session.
5	
6	 // If no session value	is	present,
redirect the user:
7	 //	Also validate the HTTP_USER_AGENT!
8 if (!isset($_SESSION['agent']) OR
($_SESSION['agent'] != md5($_SERVER
['HTTP_USER_AGENT']) )) {
9	
10	 	 // Need the functions:
11	 	 require ('includes/login_functions.
inc.php');
12	 	 redirect_user( );	
13	
14	 }
15	
16	 // Set the page title and include the
HTML header:
17	 $page_title	=	'Logged In!';
18	 include ('includes/header.html');
19	
20	 // Print	a	customized message:
21	 echo "<h1>Logged In!</h1>
22	 <p>You are now logged in, {$_SESSION	
	 ['first_name']}!</p>
23	 <p><a href=\"logout.php\">Logout</a></p>";
24	
25	 include ('includes/footer.html');
26	 ?>