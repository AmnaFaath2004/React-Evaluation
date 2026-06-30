function Footer() {
  return (
    <>
      <footer
        style={{
          backgroundColor: "#1f2937",
          color: "white",
          padding: "40px 20px",
          marginTop: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3>RoyalCart</h3>
            <p>Creating unforgettable moments and memorable experiences.</p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <p>Home</p>
            <p>Events</p>
            <p>Services</p>
            <p>Contact</p>
          </div>

          <div>
            <h4>Contact Us</h4>
            <p>📍 Kozhikode, Kerala</p>
            <p>📞 +91 98765 43210</p>
            <p>✉️ info@eventify.com</p>
          </div>

          <div>
            <h4>Follow Us</h4>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
            <p>LinkedIn</p>
          </div>
        </div>

        <hr style={{ margin: "20px 0", borderColor: "#4b5563" }} />

        <div style={{ textAlign: "center" }}>
          <p>© 2026 Eventify. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  )
}
export default Footer