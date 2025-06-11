export interface StockItem {
  id: string
  name: string
  category: "Fibre" | "Poles" | "Equipment" | "Tools" | "Consumables"
  unitOfMeasure: string
  quantityInStock: number
  minimumStock: number
  supplierId: string
  lastPurchasePrice: number
  warehouseLocation: string
  status: "In Stock" | "Low Stock" | "Out of Stock"
  itemCode?: string
  description?: string
}

export interface Supplier {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  address: string
  paymentTerms: string
  rating: number
}

export interface Project {
  id: string
  name: string
  projectManager: string
  startDate: string
  endDate: string
  status: "Active" | "Planned" | "Completed"
  location: string
  budget: number
}

export interface BOQItem {
  id: string
  projectId: string
  stockItemId: string
  requiredQuantity: number
  allocatedQuantity: number
  remainingQuantity: number
  unitPrice: number
  totalPrice: number
  status: "Planned" | "Partially Allocated" | "Fully Allocated" | "Ordered" | "Delivered"
  itemCode?: string
  description?: string
  specification?: string
  needsQuote?: boolean
}

export interface RFQ {
  id: string
  supplierId: string
  projectId: string
  rfqDate: string
  dueDate: string
  status: "Open" | "Received" | "Closed" | "Evaluated"
  totalEstimatedAmount: number
  items: RFQItem[]
  supplierPortalLink?: string
}

export interface RFQItem {
  id: string
  stockItemId: string
  quantity: number
  estimatedPrice: number
  specification?: string
  itemCode?: string
  description?: string
}

export interface Quote {
  id: string
  rfqId: string
  supplierId: string
  submittedDate: string
  validUntil: string
  totalAmount: number
  leadTime: number
  paymentTerms: string
  items: QuoteItem[]
  notes?: string
  status: "Submitted" | "Under Review" | "Accepted" | "Rejected"
  score?: number
  aiAnalysis?: string
}

export interface QuoteItem {
  id: string
  rfqItemId: string
  unitPrice: number
  totalPrice: number
  leadTime: number
  availability: string
  notes?: string
}

export interface QuoteComparison {
  rfqItemId: string
  itemName: string
  quotes: {
    quoteId: string
    supplierName: string
    unitPrice: number
    leadTime: number
    totalPrice: number
    score: number
  }[]
  recommendation: {
    bestPrice: string
    bestLeadTime: string
    bestOverall: string
    aiRecommendation?: string
  }
}

export interface StockMovement {
  id: string
  stockItemId: string
  type: "Addition" | "Consumption" | "Transfer" | "Adjustment" | "Site Allocation"
  quantity: number
  date: string
  performedBy: string
  notes: string
  projectId?: string
}
