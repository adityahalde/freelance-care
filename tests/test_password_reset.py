import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.lib.password_reset import generate_reset_token, hash_token, is_reset_token_expired


class PasswordResetTests(unittest.TestCase):
    def test_reset_token_generation_and_hashing(self):
        raw_token = generate_reset_token()
        self.assertGreater(len(raw_token), 20)
        hashed = hash_token(raw_token)
        self.assertNotEqual(hashed, raw_token)
        self.assertGreater(len(hashed), 20)

    def test_expired_token_check(self):
        self.assertTrue(is_reset_token_expired(0))
        self.assertFalse(is_reset_token_expired(60 * 60 * 24))


if __name__ == "__main__":
    unittest.main()
