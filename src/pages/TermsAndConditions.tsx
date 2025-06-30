import "@src/assets/global.css";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";

import { Divider } from "@heroui/divider";
import NavbarComponent from "@src/components/Navbar";

const TermsAndConditionsPage = () => {
  return (
    <>
      <NavbarComponent />
      <nav className="m-14 font-medium">
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem>Terms and Conditions</BreadcrumbItem>
        </Breadcrumbs>
      </nav>

      <div className="m-14">
        <small className="font-bold">Effective Date: 10 February 2025</small>
        <h1 className="mb-5 text-2xl font-bold">Terms and Conditions</h1>

        <h2 className="mb-3 text-xl font-semibold">1. Introduction</h2>
        <p className="text-justify">
          These Terms and Conditions govern your use of this website. By
          accessing and using this website, you accept these terms in full. If
          you do not agree with any part of these terms, please discontinue use
          of the website.
        </p>

        <br />

        <h2 className="mb-3 text-xl font-semibold">2. Use of Website</h2>
        <ul className="list-disc pl-5">
          <li className="text-justify">
            This website is{" "}
            <span className="font-semibold">
              for informational purposes only
            </span>{" "}
            and does not provide financial, legal, or investment advice.
          </li>
          <li className="text-justify">
            The data displayed is{" "}
            <span className="font-semibold">collected manually</span> from
            various sources and may contain inaccuracies.
          </li>
          <li className="text-justify">
            Use of the information on this website is{" "}
            <span className="font-semibold">at your own risk</span>. We are not
            responsible for any consequences arising from its use.
          </li>
        </ul>

        <br />

        <h2 className="mb-3 text-xl font-semibold">3. External Links</h2>
        <p className="text-justify">
          Our website may contain links to third-party sites. We do not control
          or endorse the content on these websites and are not responsible for
          their availability or accuracy.
        </p>

        <br />

        <h2 className="mb-3 text-xl font-semibold">
          4. Limitation of Liability
        </h2>
        <p className="text-justify">
          We provide this website <span className="font-semibold">"as is"</span>{" "}
          without warranties of any kind.
        </p>
        <p className="text-justify">
          We will <span className="font-semibold">not be liable</span> for any
          losses, damages, or issues resulting from the use of this website or
          reliance on its information.
        </p>

        <br />

        <Divider className="my-4" />

        <h2 className="mb-5 text-2xl font-bold">User Consent</h2>
        <p className="text-justify">
          By accessing or using our website, you acknowledge that you have read,
          understood, and agreed to our Terms and Conditions.
        </p>

        <br />
        <Divider className="my-4" />

        <h2 className="mb-5 text-2xl font-bold">
          Changes to This Terms and Conditions
        </h2>
        <p className="text-justify">
          We may update our Terms and Conditions at any time. Therefore, you are
          advised to review this page periodically for any changes. These
          changes will take effect immediately after they are posted on this
          page.
        </p>
      </div>
    </>
  );
};

export default TermsAndConditionsPage;
