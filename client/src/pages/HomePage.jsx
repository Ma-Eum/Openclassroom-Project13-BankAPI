import React from 'react'

const HomePage = () => {
  return (
    <>
      <section className="hero" aria-label="Promotional content">
        <div className="hero-content">
          <h1 className="sr-only">Promotions</h1>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">
            Open a savings account with Argent Bank today!
          </p>
        </div>
      </section>

      <section className="features" aria-labelledby="features-title">
        <h2 id="features-title" className="sr-only">Our Features</h2>

        <article className="feature-item">
          <img
            src="src/assets/img/icon-chat.png"
            alt="Chat with support"
            className="feature-icon"
          />
          <h3 className="feature-item-title">You are our #1 priority</h3>
          <p>
            Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes.
          </p>
        </article>

        <article className="feature-item">
          <img
            src="src/assets/img/icon-money.png"
            alt="Financial growth icon"
            className="feature-icon"
          />
          <h3 className="feature-item-title">More savings means higher rates</h3>
          <p>
            The more you save with us, the higher your interest rate will be!
          </p>
        </article>

        <article className="feature-item">
          <img
            src="src/assets/img/icon-security.png"
            alt="Security shield icon"
            className="feature-icon"
          />
          <h3 className="feature-item-title">Security you can trust</h3>
          <p>
            We use top of the line encryption to make sure your data and money
            is always safe.
          </p>
        </article>
      </section>
    </>
  )
}

export default HomePage