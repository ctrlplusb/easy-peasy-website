/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const SplashContainer = props => (
  <Container background="light">
    <div className="homeContainer">
      <div className="homeSplashFade">
        <div className="wrapper homeWrapper">{props.children}</div>
      </div>
    </div>
  </Container>
);

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} alt="Project Logo" />
  </div>
);

const ProjectTitle = ({ siteConfig }) => (
  <h2 className="projectTitle">
    <img src="img/easy-peasy.png" alt="Easy Peasy" width="150" />
    <small>{siteConfig.tagline}</small>
  </h2>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

const Button = props => (
  <div className="pluginWrapper buttonWrapper">
    <a className="button" href={props.href} target={props.target}>
      {props.children}
    </a>
  </div>
);

function HomeSplash({ siteConfig, language = '' }) {
  const { baseUrl, docsUrl } = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

  return (
    <SplashContainer>
      <ProjectTitle siteConfig={siteConfig} />
      <PromoSection>
        <Button href={docUrl('installation.html')}>Try It Out</Button>
        <Button href={docUrl('introduction.html')}>Features</Button>
      </PromoSection>
    </SplashContainer>
  );
}

function Index({ config: siteConfig, language = '' }) {
  const { baseUrl } = siteConfig;

  const Block = ({ id, background, children, layout }) => (
    <Container padding={['bottom', 'top']} id={id} background={background}>
      <GridBlock align="left" contents={children} layout={layout} />
    </Container>
  );

  const Description = () => (
    <Block background="light">
      {[
        {
          content:
            'Easy Peasy gives you the power of Redux (and its tooling) whilst avoiding the boilerplate. It allows you to create a Redux store by defining a model that describes your state and its actions. Batteries are included - you don&apos;t need to configure any additional packages to support derived state, side effects, memoisation, or integration with React.',
          image: `${baseUrl}img/easy-peasy.png`,
          imageAlign: 'right',
          title: 'Description',
          textAlign: 'left',
        },
      ]}
    </Block>
  );

  const LearnHow = () => (
    <Block background="light">
      {[
        {
          content:
            "Just go to the [installation docs](docs/installation) and follow the 'Core Concepts', followed by a relevant example or usage guide.\n\nThat'll make you an easy-peasy expert in no time!",
          title: 'Learn How',
        },
      ]}
    </Block>
  );

  return (
    <div>
      <HomeSplash siteConfig={siteConfig} language={language} />
      <div className="mainContainer">
        <Container padding={['bottom', 'top']}>
          <GridBlock
            align="left"
            contents={[
              {
                content: `Easy Peasy gives you the power of Redux (and its tooling) whilst avoiding the boilerplate. 
                
It allows you to create a Redux store by defining a model that describes your state and its actions. Batteries are included - you don&apos;t need to configure any additional packages to support derived state, side effects, memoisation, or integration with React.`,
                textAlign: 'left',
              },
              {
                content: `
\`\`\`javascript
import { action, createStore, StoreProvider, useStore, useActions } from 'easy-peasy';

const store = createStore({
  todos: {
    items: ['Install easy-peasy', 'Define your model', 'Have fun'],
    add: action((state, payload) => {
      state.items.push(payload)
    })
  }
});

const App = () => (
  <StoreProvider store={store}>
    <TodoList />
  </StoreProvider>
)

function TodoList() {
  const todos = useStore(state => state.todos.items)
  const add = useActions(actions => actions.todos.add)
  return (
    <div>
      {todos.map((todo, idx) => <div key={idx}>{todo}</div>)}
      <AddTodo onAdd={add} />
    </div>
  )
}
\`\`\`
                  `,
                textAlign: 'left',
              },
            ]}
          />
        </Container>
        <LearnHow />
      </div>
    </div>
  );
}

module.exports = Index;
