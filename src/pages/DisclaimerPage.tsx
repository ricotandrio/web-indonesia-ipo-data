import "@src/assets/global.css";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";

import { Divider } from "@heroui/divider";
import NavbarComponent from "@src/components/Navbar";

const DisclaimerPage = () => {
  return (
    <>
      <NavbarComponent />
      <nav className="m-14 font-medium">
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem>Disclaimer</BreadcrumbItem>
        </Breadcrumbs>
      </nav>

      <div className="m-14">
        <small className="font-bold">Effective Date: 10 February 2025</small>
        <h1 className="mb-5 text-2xl font-bold">Disclaimer</h1>

        <p className="text-justify">
          Being an open-source project, <i> Web Indonesia IPO Data </i> is
          provided 'as-is' without any warranties or guarantees of any kind. The
          developers are not responsible for any damages, losses, or issues that
          may arise from the use of this software. Users are encouraged to
          review the code and documentation thoroughly before use. Any
          modifications or usage of the project are at the user's own risk.
        </p>

        <br />

        <p className="text-justify">
          This website provides data on Initial Public Offerings (IPOs) in
          Indonesia, collected from various sources. While we strive for
          accuracy, the data may not always be up-to-date or error-free. As an
          open-source project, we welcome contributions to improve its quality.
          If you find inaccuracies, feel free to submit a pull request via our{" "}
          <a
            href="https://github.com/ricotandrio/web-indonesia-ipo-data/discussions"
            className="underline text-blue-500"
          >
            GitHub repository
          </a>
          .
        </p>

        <br />

        <p className="text-justify">
          All information is published in good faith for general informational
          purposes only. We make no guarantees regarding its accuracy or
          reliability. Any actions taken based on this information are at your
          own risk. We are not liable for any losses or damages resulting from
          the use of this website.
        </p>

        <br />

        <p className="text-justify">
          Our site may contain links to external websites. While we aim to
          provide quality links, we have no control over their content. These
          links do not imply an endorsement. Site content may change without
          notice, and we are not responsible for outdated or inappropriate
          links.
        </p>

        <br />

        <p className="text-justify">
          Decisions made based on this data are at your own risk. This website
          does not provide financial advice. Please verify all information
          independently before making any decisions.
        </p>

        <br />

        <Divider className="my-4" />

        <h2 className="mb-5 text-2xl font-bold">User Consent</h2>
        <p className="text-justify">
          By accessing or using our website, you acknowledge that you have read,
          understood, and agreed to our Disclaimer.
        </p>

        <br />
        <Divider className="my-4" />

        <h2 className="mb-5 text-2xl font-bold">Changes to This Disclaimer</h2>
        <p className="text-justify">
          We may update our Disclaimer at any time. Therefore, you are advised
          to review this page periodically for any changes. These changes will
          take effect immediately after they are posted on this page.
        </p>
      </div>
    </>
  );
};

export default DisclaimerPage;
