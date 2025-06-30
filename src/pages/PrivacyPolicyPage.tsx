import "@src/assets/global.css";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";

import { Divider } from "@heroui/divider";
import NavbarComponent from "@src/components/Navbar";

const PrivacyPolicyPage = () => {
  return (
    <>
      <NavbarComponent />
      <nav className="m-14 font-medium">
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem>Privacy Policy</BreadcrumbItem>
        </Breadcrumbs>
      </nav>

      <div className="m-14">
        <small className="font-bold">Effective Date: 10 February 2025</small>
        <h1 className="mb-5 text-2xl font-bold">Privacy Policy</h1>
        <p className="text-justify">
          This Privacy Policy explains how we handle user privacy when you visit
          our website. Since our website only displays publicly available
          <span className="font-semibold">
            {" "}
            static data related to Initial Public Offerings (IPOs) in Indonesia
          </span>{" "}
          and does not collect or process any personal information, this policy
          is simple and straightforward.
        </p>

        <br />

        <h2 className="mb-3 text-xl font-semibold">
          1. Information We Do Not Collect
        </h2>
        <p className="text-justify">
          We do <span className="font-semibold">not</span> collect, store, or
          process any personal information from visitors. This includes:
        </p>
        <ul className="list-disc pl-5">
          <li>No user accounts or registrations</li>
          <li>No cookies or tracking mechanisms</li>
          <li>
            No collection of emails, IP addresses, or other identifiable data
          </li>
        </ul>

        <br />

        <h2 className="mb-3 text-xl font-semibold">2. External Links</h2>
        <p className="text-justify">
          Our website may contain links to external sites. We are not
          responsible for the privacy practices of these third-party websites.
          We recommend reviewing their privacy policies before providing any
          personal information.
        </p>

        <br />
        <Divider className="my-4" />

        <h2 className="mb-5 text-2xl font-bold">User Consent</h2>
        <p className="text-justify">
          By accessing or using our website, you acknowledge that you have read,
          understood, and agreed to our Privacy Policy.
        </p>

        <br />
        <Divider className="my-4" />

        <h2 className="mb-5 text-2xl font-bold">
          Changes to This Privacy Policy
        </h2>
        <p className="text-justify">
          We may update our Privacy Policy at any time. Therefore, you are
          advised to review this page periodically for any changes. These
          changes will take effect immediately after they are posted on this
          page.
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
