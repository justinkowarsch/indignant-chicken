// Junk Mail Processing Invoice - The invoice that started an $8.2M corporate initiative
const junkMailInvoiceData = {
  documentType: "INVOICE",
  title: "INVOICE",
  invoiceNumber: "UMP-2025-001",
  date: "October 8, 2025",
  dueDate: "Net 30 Days",

  billFrom: {
    name: "Unwanted Mail Processing Services",
    proprietor: "David L. Hendricks, Sole Proprietor",
    address: "[Address Redacted]",
    email: "stop.sending.me.junk@example.com"
  },

  billTo: {
    name: "MegaCorp Financial Services",
    attention: "Accounts Payable Department",
    address: "Corporate Headquarters",
    city: "New York, NY 10001"
  },

  lineItems: [
    // LABOR COSTS
    { category: "LABOR COSTS", isHeader: true },
    {
      item: "Mailbox retrieval walk (3 minutes @ $100/hr)",
      amount: 5.00
    },
    {
      item: "Sorting legitimate mail from junk (2 minutes)",
      amount: 4.00
    },
    {
      item: "Initial assessment of marketing material (30 seconds)",
      amount: 1.00
    },
    {
      item: "Eye-rolling and audible sigh (15 seconds)",
      amount: 0.75
    },
    {
      item: "Decision-making: Keep vs. Trash analysis (45 seconds)",
      amount: 1.50
    },
    {
      item: "Physical opening of envelope (30 seconds)",
      amount: 1.00
    },
    {
      item: "Scanning for personal information requiring shredding (1 min)",
      amount: 2.50
    },
    {
      item: "Carrying junk mail to recycling bin (45 seconds)",
      amount: 1.25
    },
    {
      item: "Bin opening and disposal motion (15 seconds)",
      amount: 0.50
    },

    // MATERIAL & EQUIPMENT COSTS
    { category: "MATERIAL & EQUIPMENT COSTS", isHeader: true },
    {
      item: "Mailbox wear and tear (per item)",
      amount: 0.25
    },
    {
      item: "Shoe sole depreciation (walking to/from mailbox)",
      amount: 0.15
    },
    {
      item: "Door hinge usage (mailbox opening/closing)",
      amount: 0.10
    },
    {
      item: "Hand sanitizer (post-junk mail handling)",
      amount: 0.35
    },
    {
      item: "Recycling bin space rental (per cubic inch)",
      amount: 0.50
    },
    {
      item: "Environmental carbon offset (recycling processing)",
      amount: 1.00
    },

    // OVERHEAD & ADMINISTRATIVE
    { category: "OVERHEAD & ADMINISTRATIVE", isHeader: true },
    {
      item: "General annoyance factor",
      amount: 10.00
    },
    {
      item: "Mental bandwidth consumed by unwanted marketing",
      amount: 7.50
    },
    {
      item: "Disruption of peaceful mailbox-checking experience",
      amount: 5.00
    },
    {
      item: "Storage of mail during transit to recycling (counter space)",
      amount: 0.75
    },
    {
      item: "Clutter stress induced by paper accumulation",
      amount: 3.00
    },
    {
      item: "Decision fatigue: To invoice or not to invoice (2 hours contemplation)",
      amount: 7.75
    },

    // OPPORTUNITY COSTS
    { category: "OPPORTUNITY COSTS", isHeader: true },
    {
      item: "Time lost that could have been spent reading actual mail",
      amount: 5.00
    },
    {
      item: "Time lost that could have been spent napping",
      amount: 8.00
    },
    {
      item: "Time lost that could have been spent contemplating existence",
      amount: 6.50
    },
    {
      item: "Time lost that could have been spent literally anything else",
      amount: 4.00
    },

    // SPECIALIZED SERVICES
    { category: "SPECIALIZED SERVICES", isHeader: true },
    {
      item: "Shredding services (if personal info present)",
      amount: 3.00
    },
    {
      item: "Curse word muttered under breath",
      amount: 2.00
    },
    {
      item: "Showing junk mail to spouse/roommate with commentary",
      amount: 4.50
    },
    {
      item: "Email filter management (attempted unsubscribe)",
      amount: 15.00
    },
    {
      item: "Computer usage for opt-out website navigation",
      amount: 3.50
    },
    {
      item: "Internet bandwidth for opt-out forms",
      amount: 0.75
    },
    {
      item: "Mouse clicks (approximately 15) @ $0.25 each",
      amount: 3.75
    },
    {
      item: "Keyboard usage for typing \"STOP SENDING ME STUFF\"",
      amount: 2.00
    },

    // EMOTIONAL DAMAGES
    { category: "EMOTIONAL DAMAGES", isHeader: true },
    {
      item: "Brief moment of hope that it was something good",
      amount: 8.00
    },
    {
      item: "Disappointment upon realization it's junk",
      amount: 12.00
    },
    {
      item: "Resentment toward marketing industry (itemized)",
      amount: 15.00
    },
    {
      item: "Loss of faith in humanity",
      amount: 20.00
    },
    {
      item: "Guilt about trees dying for this nonsense",
      amount: 5.00
    },
    {
      item: "Existential crisis about consumer culture",
      amount: 7.50
    },

    // OPTIONAL ADD-ONS
    { category: "OPTIONAL ADD-ONS (This Particular Mailing)", isHeader: true },
    {
      item: "Glossy paper upgrade surcharge (harder to recycle)",
      amount: 5.00
    },
    {
      item: "Oversized mailer requiring two hands",
      amount: 3.00
    },
    {
      item: "\"Urgent\" / \"Time Sensitive\" false urgency markup",
      amount: 10.00
    },
    {
      item: "\"You've been pre-approved!\" insult to intelligence",
      amount: 15.00
    },
    {
      item: "Fake handwriting on envelope (deception fee)",
      amount: 8.00
    },
    {
      item: "Window envelope with name visible (privacy concern)",
      amount: 6.00
    },

    // INVOICE PREPARATION COSTS
    { category: "INVOICE PREPARATION COSTS", isHeader: true },
    {
      item: "Standard envelope (#10)",
      amount: 0.15
    },
    {
      item: "Forever stamp (current USPS rate)",
      amount: 0.73
    },
    {
      item: "Premium printer paper (20lb, bright white)",
      amount: 0.05
    },
    {
      item: "Black ink cartridge usage (2% depletion)",
      amount: 0.68
    },
    {
      item: "MAGENTA INK CARTRIDGE DEPLETION FEE",
      amount: 45.00,
      highlight: true,
      note: "Why is it always magenta? Nobody knows. Scientific mystery surcharge included."
    },
    {
      item: "Cyan cartridge (sympathy depletion)",
      amount: 18.00
    },
    {
      item: "Yellow cartridge (solidarity depletion)",
      amount: 12.00
    },
    {
      item: "Printer warm-up cycle energy cost",
      amount: 0.25
    },
    {
      item: "Printer jam risk premium (insurance)",
      amount: 2.00
    },
    {
      item: "Paper alignment curse words",
      amount: 1.50
    },
    {
      item: "Walking to mailbox to SEND this invoice (round trip)",
      amount: 5.00
    },
    {
      item: "Return address label application",
      amount: 1.00
    },
    {
      item: "Envelope licking (or sponge usage if available)",
      amount: 0.50
    },
    {
      item: "Envelope sealing satisfaction (credit applied)",
      amount: -0.25,
      isCredit: true
    },
    {
      item: "Ironic postage application ceremony",
      amount: 3.00
    },
    {
      item: "Emotional investment in revenge invoice concept",
      amount: 25.00
    }
  ],

  subtotal: 340.96,
  tax: 0.00,
  taxNote: "Service exempt",
  total: 340.96,

  paymentTerms: "Net 30 days",
  latePaymentFee: "$50.00 per month (because two can play this game)",

  notes: [
    "All charges calculated using standard consulting rates",
    "Emotional damage estimates conservative and independently verified",
    "Magenta ink cartridge depletion scientifically measured",
    "This invoice printed on recycled paper (the irony is intentional)",
    "Future mailings will incur recurring charges",
    "Bulk discount NOT available"
  ],

  footer: "Thank you for your business (that you forced upon me)."
};

// Export for CommonJS (Node.js script)
module.exports = { junkMailInvoiceData };
