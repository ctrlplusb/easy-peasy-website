/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = '' } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className='homeContainer'>
        <div className='homeSplashFade'>
          <div className='wrapper homeWrapper'>{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className='projectLogo'>
        <img src={props.img_src} alt='Project Logo' />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className='projectTitle'>
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className='section promoSection'>
        <div className='promoRow'>
          <div className='pluginRowBlock'>{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className='pluginWrapper buttonWrapper'>
        <a className='button' href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <div className='inner'>
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={docUrl('installation.html')}>Try It Out</Button>
            <Button href={docUrl('introduction.html')}>Features</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = '' } = this.props;
    const { baseUrl } = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}
      >
        <GridBlock
          align='center'
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const FeatureCallout = () => (
      <div
        className='productShowcaseSection paddingBottom'
        style={{ textAlign: 'center' }}
      >
        <h2>Feature Callout</h2>
        <MarkdownBlock>These are features of this project:</MarkdownBlock>
      </div>
    );

    const TryOut = () => (
      <Block id='try'>
        {[
          {
            content: 'Talk about trying this out',
            title: 'Try it Out',
          },
        ]}
      </Block>
    );

    const Description = () => (
      <Block background='light'>
        {[
          {
            content:
              'Easy Peasy gives you the power of Redux (and its tooling) whilst avoiding the boilerplate. It allows you to create a Redux store by defining a model that describes your state and its actions. Batteries are included - you don&apos;t need to configure any additional packages to support derived state, side effects, memoisation, or integration with React.',
            image: `${baseUrl}img/easy-peasy-minified.png`,
            imageAlign: 'right',
            title: 'Description',
          },
        ]}
      </Block>
    );

    const LearnHow = () => (
      <Block background='light'>
        {[
          {
            content:
              "Just go to the [installation docs](docs/installation) and follow the 'Core Concepts', followed by a relevant example or usage guide.\n\nThat'll make you an easy-peasy expert in no time!",
            title: 'Learn How',
          },
        ]}
      </Block>
    );

    const Features = () => (
      <Block layout='fourColumn'>
        {[
          {
            content: 'This is the content of my feature',
            image: `${baseUrl}img/docusaurus.svg`,
            imageAlign: 'top',
            title: 'Feature One',
          },
          {
            content: 'The content of my second feature',
            image: `${baseUrl}img/docusaurus.svg`,
            imageAlign: 'top',
            title: 'Feature Two',
          },
        ]}
      </Block>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className='productShowcaseSection paddingBottom'>
          <h2>Who is Using This?</h2>
          <p>This project is used by all these people</p>
          <div className='logos'>{showcase}</div>
          <div className='more-users'>
            <a className='button' href={pageUrl('users.html')}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className='mainContainer'>
          <Description />
          <LearnHow />
          {/*
          <Features />
          <FeatureCallout />
          <TryOut />
          <Showcase /> */}
        </div>
      </div>
    );
  }
}

module.exports = Index;
