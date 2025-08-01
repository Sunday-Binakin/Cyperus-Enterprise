import Link from 'next/link';
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">Privacy Policy</h1>
      
      <div className="max-w-none text-white">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-white">Who we are</h2>
          <p className="mb-6 text-white">Our website address is <Link href="http://cyperenterprise.com" className="text-yellow-400 hover:underline">http://cyperenterprise.com</Link>.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-white">Comments</h2>
          <p className="mb-4 text-white">When visitors leave comments on the site, we collect the data shown in the comments form and the visitor&apos;s IP address and browser user agent string to help with spam detection.</p>
          <p className="mb-6 text-white">An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: <Link href="https://automattic.com/privacy/" className="text-yellow-400 hover:underline">https://automattic.com/privacy/</Link>. After approval of your comment, your profile picture is visible to the public in the context of your comment.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-white">Media</h2>
          <p className="mb-6 text-white">If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors can download and extract any location data from images on the website.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-white">Cookies</h2>
          <p className="mb-4 text-white">If you leave a comment on our site, you may opt-in to save your name, email address, and website in cookies. These are for your convenience, so you do not have to fill in your details again when you leave another comment. These cookies will last for one year.</p>
          <p className="mb-4 text-white">If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.</p>
          <p className="mb-6 text-white">When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select &quot;Remember Me&quot;, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.</p>
          <p className="mb-6 text-white">If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-white">Embedded content from other websites</h2>
          <p className="mb-4 text-white">Articles on this site may include embedded content (e.g., videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.</p>
          <p className="mb-6 text-white">These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-white">Who do we share your data with?</h2>
          <p className="mb-6 text-white">If you request a password reset, your IP address will be included in the reset email.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-white">How long we retain your data</h2>
          <p className="mb-4 text-white">If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.</p>
          <p className="mb-6 text-white">For users who register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-white">What rights do you have over your data?</h2>
          <p className="mb-6 text-white">If you have an account on this site or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Where your data is sent</h2>
          <p className="text-white">Visitor comments may be checked through an automated spam detection service.</p>
        </section>
      </div>
    </div>
    </div>
  );
}
