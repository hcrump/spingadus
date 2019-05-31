from project import app
import unittest

### all test functions must start with the word 'test'
### unittest wants it this way
class FlaskTestCase(unittest.TestCase):
    # ensure that flask was setup correctly
    def test_index(self):
        tester = app.test_client(self)
        response = tester.get('/login',content_type='html/text')
        self.assertEqual(response.status_code, 200)

    # ensure that login page loads correctly
    def test_login_page_loads(self):
        tester = app.test_client(self)
        response = tester.get('/login',content_type='html/text')
        self.assertTrue(b'Please Login' in response.data)

    # ensure login acts correctly given correct credentials
    def test_correct_login(self):
        tester = app.test_client(self)
        response = tester.post(
            '/login',
            data=dict(username='admin', password='admin'),
            follow_redirects=True
        )
        self.assertIn(b'You were just logged in',response.data)

    # ensure login acts correctly given incorrect credentials
    def test_incorrect_login(self):
        tester = app.test_client(self)
        response = tester.post(
            '/login',
            data=dict(username='wrong', password='wrong'),
            follow_redirects = True
        )
        self.assertIn(b'Invalid credentials. Please try again',response.data)

    # ensure logout acts correctly
    def test_logout(self):
        tester = app.test_client(self)
        tester.post(
            '/login',
            data=dict(username='wrong', password='wrong'),
            follow_redirects = True
        )
        response = tester.get('/logout', follow_redirects=True)
        self.assertIn(b'You were logged out',response.data)

    # ensure that the dashboard page requires login
    # change for whatever page you want to be secured
    def test_dashboard_requires_login(self):
        tester = app.test_client(self)
        response = tester.get('/dashboard',follow_redirects=True)
        self.assertTrue(b'You need to login first' in response.data)


    # ensure that posts show up on the main page
    def test_post_show_up(self):
        tester = app.test_client(self)
        tester.post(
            '/login',
            data=dict(username='admin', password='admin'),
            follow_redirects=True
        )
        response = tester.get('/dashboard',follow_redirects=True)
        self.assertIn(b'm good',response.data)


if __name__ == '__main__':
    unittest.main()
