import Heading from "@theme/Heading";
import clsx from "clsx";
import type { ReactNode } from "react";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
  id: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: "The Field Memo",
    Svg: require("@site/static/img/field_notes.svg").default,
    description: (
      <>
        Tiny observations. Big snark. These bite-sized blurbs cut through the
        sludge with sarcasm sharp enough to file a grievance.
      </>
    ),
    id: "easy-to-use",
  },
  {
    title: "Systems Analysis",
    Svg: require("@site/static/img/field_notes.svg").default,
    description: (
      <>
        A deep dive into the steaming guts of organizational dysfunction.
        Because satire is sometimes the only way to cope with systems this bad.
      </>
    ),
    id: "trash",
  },
  {
    title: "The Escalation Log",
    Svg: require("@site/static/img/field_notes.svg").default,
    description: (
      <>
        Real tales of managerial mayhem. Names may be changed, but the facepalms
        are forever.
      </>
    ),
    id: "dumpster-fire",
  },
  {
    title: "Sludge Alert",
    Svg: require("@site/static/img/field_notes.svg").default,
    description: (
      <>
        Field reports of freshly discovered bureaucracy so thick it requires a
        permit to navigate.
      </>
    ),
    id: "garbage",
  },
];

function Feature({ title, Svg, description }: Readonly<FeatureItem>) {
  return (
    <div className={clsx("col col--3")}>
      <div className="text--center">
        <Svg className={styles.featureSvg}>
          <title>{title}</title>
        </Svg>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props) => (
            <Feature key={props.id} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
