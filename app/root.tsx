import * as React from "react";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLocation,
} from "remix";
import type { LinksFunction } from "remix";
import styles from './tailwind.css';
import deleteMeRemixStyles from "~/styles/demos/remix.css";
import globalStylesUrl from "~/styles/global.css";
import darkStylesUrl from "~/styles/dark.css";
import tagStyles from "~/styles/cnxt/tags.css";

/**
 * The `links` export is a function that returns an array of objects that map to
 * the attributes for an HTML `<link>` element. These will load `<link>` tags on
 * every route in the app, but individual routes can include their own links
 * that are automatically unloaded when a user navigates away from the route.
 *
 * https://remix.run/api/app#links
 */
export let links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: globalStylesUrl },
    { rel: 'stylesheet', href: tagStyles },
    {
      rel: 'stylesheet',
      href: darkStylesUrl,
      media: '(prefers-color-scheme: dark)',
    },
    { rel: 'stylesheet', href: deleteMeRemixStyles },
    { rel: 'stylesheet', href: styles },
  ];
};

/**
 * The root module's default export is a component that renders the current
 * route via the `<Outlet />` component. Think of this as the global layout
 * component for your app.
 */
export default function App() {
  return (
    <Document>
      <Layout>
          <Outlet /> 
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <RouteChangeAnnouncement />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="remix-app">
      <header className="remix-app__header">
        <div className="container remix-app__header-content">
          <Link to="/" title="Remix" className="remix-app__header-home-link">
            <Logo />
          </Link>
          <nav aria-label="Main navigation" className="remix-app__header-nav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/mint">Metric❌Tags</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="remix-app__main">
        <div className="container remix-app__main-content">{children}</div>
      </div>
      <footer className="remix-app__footer">
        <div className="container remix-app__footer-content">
          <p className='font-medium'>&copy; CN❌T | THE❌DESK</p>
        </div>
      </footer>
    </div>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            TODO: FIX BUG IN CODE
          </p>
        </div>
      </Layout>
    </Document>
  );
}

function Logo(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 1061 253"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-labelledby="remix-run-logo-title"
      role="img"
      width="106"
      height="30"
      fill="currentColor"
      {...props}
    >
      <g transform="matrix(1,0,0,1,-249,-135)">
        <g transform="matrix(1,0,0,1,-88,-816)">
          <g transform="matrix(4.53085,0,0,4.53085,337.554,376.39)">
            <g transform="matrix(0.149307,0,0,0.149307,-653.047,-29.1861)">
              <path
                fill="rgb(52,151,250)"
                d="M5940.91,1047.05L5940.91,1048.26L5856.67,1125.74L5823.39,1125.74L5856.67,1125.74L5832.17,1148.26L5815.53,1148.26L5810,1142.25L5815.53,1148.26L5723.87,1148.26L5723.87,1417.65L5569.22,1417.65L5569.22,1395.12L5583.51,1395.12L5583.51,1148.26L5478.51,1148.26L5478.51,1126.03L5531.65,1126.03C5546.35,1112.59 5562.41,1100.8 5579.32,1090.23C5595.83,1079.9 5602.32,1061.15 5617.05,1049.62L5621.75,1049.62L5621.75,1047.05L5940.91,1047.05ZM5605.74,1392.05C5608.25,1393.17 5611.11,1394.2 5614.25,1395.12L5605.74,1395.12L5605.74,1392.05ZM5701.63,1394.61L5701.63,1395.12L5700.41,1395.12C5700.82,1394.95 5701.23,1394.78 5701.63,1394.61ZM5826.96,1145.08C5827.54,1145.08 5828.12,1145.09 5828.69,1145.09L5828.57,1145.09C5828.03,1145.09 5827.5,1145.08 5826.96,1145.08ZM5830.39,1145.07L5830.23,1145.07L5830.39,1145.07ZM5831.15,1145.04L5831.12,1145.05L5831.15,1145.04L5831.21,1145.04L5831.15,1145.04ZM5831.39,1145.03L5831.34,1145.04L5831.39,1145.03ZM5831.64,1145.02L5831.58,1145.02L5831.52,1145.03C5831.56,1145.03 5831.6,1145.02 5831.64,1145.02ZM5822.99,1144.99L5823.12,1144.99L5822.99,1144.99ZM5821.14,1144.97L5821.49,1144.97L5821.14,1144.97ZM5820.68,1144.97L5820.89,1144.97L5820.68,1144.97ZM5832.67,1144.95C5832.62,1144.96 5832.58,1144.96 5832.53,1144.96C5832.6,1144.96 5832.66,1144.95 5832.73,1144.95L5832.67,1144.95ZM5833.53,1144.88C5833.34,1144.9 5833.15,1144.91 5832.96,1144.93C5833.15,1144.91 5833.34,1144.9 5833.53,1144.88ZM5834,1144.83L5833.97,1144.83C5834,1144.83 5834.03,1144.82 5834.06,1144.82L5834,1144.83ZM5834.24,1144.8L5834.18,1144.8L5834.12,1144.81L5834.18,1144.8L5834.24,1144.8ZM5834.36,1144.78L5834.42,1144.77C5834.4,1144.78 5834.38,1144.78 5834.36,1144.78L5834.3,1144.79C5834.32,1144.79 5834.34,1144.78 5834.36,1144.78ZM5835.19,1144.66L5835.14,1144.67L5835.19,1144.66L5835.25,1144.65L5835.19,1144.66Z"
              />
            </g>
            <g transform="matrix(0.149307,0,0,0.149307,-653.047,-29.1861)">
              <path
                fill="rgb(255,255,255)"
                d="M5047.86,1253.48L4821.11,1044.95L4820.49,1045.62L4820.49,1044.95L4643.86,1044.95L4643.86,1045.16C4606.52,1045.92 4569.31,1048.83 4532.4,1055.36C4437.34,1072.17 4379.47,1135.86 4374.11,1220.85C4369.3,1297.17 4433.24,1397.97 4545.32,1410.93C4592.41,1416.37 4639.6,1416.87 4686.82,1416.42L4822.81,1416.42L4824.26,1416.65L4823.57,1416.42L4834.4,1416.42L4834.4,1416.05L4835.17,1416.05L4835.17,1224.73L5043.86,1416.65L5043.86,1417.36L5157.49,1417.36L5157.49,1395.12L5087.07,1395.12C5091.98,1389.89 5097.27,1385.07 5102.77,1380.48L5161.49,1380.48L5161.49,1047.05L5047.86,1047.05L5047.86,1253.48ZM4710.22,1319C4708.3,1319.43 4706.05,1319.56 4703.45,1319.42C4700.06,1319.23 4696.66,1319.1 4693.26,1319L4661.75,1319C4639.77,1319.41 4617.76,1320.28 4595.79,1319L4574.86,1319L4574.86,1318.9C4528.12,1316.64 4490.86,1277.98 4490.86,1230.68C4490.86,1183.39 4528.12,1144.73 4574.86,1142.47L4574.86,1142.37L4724.82,1142.37L4724.82,1319L4710.22,1319Z"
              />
            </g>
            <g transform="matrix(0.220709,0,0,0.220709,-55.0788,97.0259)">
              <path
                fill="rgb(202,37,37)"
                d="M982.147,136.535L982.147,136.467L1106.12,136.467L1091.24,150.09L1091.12,150.091L969.733,261.725L1093.74,375.763L1093.7,375.805L1106.12,387.176L982.147,387.177L982.147,386.911L982.082,386.981L907.807,318.674L833.539,386.973L833.539,387.177L709.564,387.176L721.951,375.84L721.88,375.763L845.882,261.726L724.492,150.09L724.448,150.09L709.564,136.467L833.539,136.467L833.539,136.476L907.808,204.777L982.086,136.468L982.147,136.535Z"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

/**
 * Provides an alert for screen reader users when the route changes.
 */
const RouteChangeAnnouncement = React.memo(() => {
  let [hydrated, setHydrated] = React.useState(false);
  let [innerHtml, setInnerHtml] = React.useState("");
  let location = useLocation();

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  let firstRenderRef = React.useRef(true);
  React.useEffect(() => {
    // Skip the first render because we don't want an announcement on the
    // initial page load.
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    let pageTitle = location.pathname === "/" ? "Home" : document.title;
    setInnerHtml(`Navigated to ${pageTitle}`);
  }, [location.pathname]);

  // Render nothing on the server. The live region provides no value unless
  // scripts are loaded and the browser takes over normal routing.
  if (!hydrated) {
    return null;
  }

  return (
    <div
      aria-live="assertive"
      aria-atomic
      id="route-change-region"
      style={{
        border: "0",
        clipPath: "inset(100%)",
        clip: "rect(0 0 0 0)",
        height: "1px",
        margin: "-1px",
        overflow: "hidden",
        padding: "0",
        position: "absolute",
        width: "1px",
        whiteSpace: "nowrap",
        wordWrap: "normal",
      }}
    >
      {innerHtml}
    </div>
  );
});
