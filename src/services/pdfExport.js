// PDF Export Service using jsPDF library
// Note: You may need to install jsPDF: npm install jspdf

/**
 * Simple PDF table generator for portfolio
 */
export const exportPortfolioPDF = async (portfolio) => {
  try {
    // Dynamically import jsPDF to avoid bundle size issues
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF()

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    let yPosition = 10

    // Header
    doc.setFontSize(18)
    doc.text('Investment Portfolio Report', 10, yPosition)
    yPosition += 10

    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text(`Export Date: ${new Date().toLocaleString()}`, 10, yPosition)
    yPosition += 5
    doc.text(`Account Balance: $${portfolio.balance.toFixed(2)}`, 10, yPosition)
    yPosition += 10

    // Holdings Table
    doc.setFontSize(12)
    doc.setTextColor(0)
    doc.text('Holdings', 10, yPosition)
    yPosition += 8

    const tableData = portfolio.investments.map((inv) => {
      const currentValue = inv.currentPrice * inv.quantity
      const investedAmount = inv.buyPrice * inv.quantity
      const gainLoss = currentValue - investedAmount
      const returnPercent = ((gainLoss / investedAmount) * 100).toFixed(2)

      return [
        inv.symbol,
        inv.quantity.toString(),
        `$${inv.buyPrice.toFixed(2)}`,
        `$${inv.currentPrice.toFixed(2)}`,
        `$${investedAmount.toFixed(2)}`,
        `$${currentValue.toFixed(2)}`,
        `$${gainLoss.toFixed(2)}`,
        `${returnPercent}%`,
      ]
    })

    // Draw table
    const columnWidth = (pageWidth - 20) / 8
    const columns = ['Symbol', 'Qty', 'Buy Price', 'Current', 'Invested', 'Current Value', 'Gain/Loss', 'Return %']

    // Header row
    doc.setFillColor(66, 133, 244)
    doc.setTextColor(255)
    doc.setFontSize(9)
    columns.forEach((col, idx) => {
      doc.text(col, 10 + idx * columnWidth, yPosition, { maxWidth: columnWidth - 1, align: 'center' })
    })

    yPosition += 7
    doc.setTextColor(0)
    doc.setFillColor(245, 245, 245)

    // Data rows
    tableData.forEach((row, idx) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage()
        yPosition = 10
      }

      row.forEach((cell, colIdx) => {
        doc.text(cell, 10 + colIdx * columnWidth, yPosition, {
          maxWidth: columnWidth - 1,
          align: 'center',
        })
      })

      yPosition += 6
      if (idx % 2 === 0) {
        doc.setFillColor(245, 245, 245)
      } else {
        doc.setFillColor(255)
      }
    })

    // Summary
    yPosition += 5
    doc.setFontSize(11)
    doc.setTextColor(0)

    const totalInvested = portfolio.investments.reduce(
      (sum, inv) => sum + inv.buyPrice * inv.quantity,
      0
    )
    const totalCurrent = portfolio.investments.reduce(
      (sum, inv) => sum + inv.currentPrice * inv.quantity,
      0
    )
    const totalGain = totalCurrent - totalInvested

    doc.text(
      `Total Invested: $${totalInvested.toFixed(2)}`,
      10,
      yPosition
    )
    yPosition += 6
    doc.text(`Current Value: $${totalCurrent.toFixed(2)}`, 10, yPosition)
    yPosition += 6
    doc.text(
      `Total Gain/Loss: $${totalGain.toFixed(2)} (${((totalGain / totalInvested) * 100).toFixed(2)}%)`,
      10,
      yPosition
    )

    doc.save('portfolio-report.pdf')
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Failed to generate PDF. Please try again.')
  }
}

/**
 * Export analytics dashboard as PDF
 */
export const exportAnalyticsPDF = async (analytics, chartImages = []) => {
  try {
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF()

    const pageWidth = doc.internal.pageSize.getWidth()
    let yPosition = 10

    // Header
    doc.setFontSize(18)
    doc.text('Portfolio Analytics Report', 10, yPosition)
    yPosition += 10

    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text(`Export Date: ${new Date().toLocaleString()}`, 10, yPosition)
    yPosition += 15

    // Metrics
    doc.setFontSize(12)
    doc.setTextColor(0)
    doc.text('Key Metrics', 10, yPosition)
    yPosition += 8

    Object.entries(analytics).forEach(([key, value]) => {
      doc.setFontSize(10)
      const displayValue = typeof value === 'object' ? JSON.stringify(value) : value
      doc.text(`${key}: ${displayValue}`, 10, yPosition)
      yPosition += 6
    })

    // Add chart images if provided
    if (chartImages.length > 0) {
      doc.addPage()
      yPosition = 10
      doc.setFontSize(12)
      doc.text('Charts', 10, yPosition)
      yPosition += 15

      chartImages.forEach((imageData, idx) => {
        if (yPosition > 200) {
          doc.addPage()
          yPosition = 10
        }
        doc.addImage(imageData, 'PNG', 10, yPosition, 190, 100)
        yPosition += 110
      })
    }

    doc.save('analytics-report.pdf')
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Failed to generate PDF. Make sure jsPDF is installed: npm install jspdf')
  }
}

/**
 * Export transactions as PDF
 */
export const exportTransactionsPDF = async (transactions) => {
  try {
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF()

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    let yPosition = 10

    // Header
    doc.setFontSize(18)
    doc.text('Transaction History', 10, yPosition)
    yPosition += 10

    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text(`Export Date: ${new Date().toLocaleString()}`, 10, yPosition)
    yPosition += 15

    // Table header
    doc.setFillColor(66, 133, 244)
    doc.setTextColor(255)
    doc.setFontSize(9)

    const columns = ['Date', 'Type', 'Symbol', 'Qty', 'Price', 'Total']
    const columnWidth = (pageWidth - 20) / columns.length

    columns.forEach((col, idx) => {
      doc.text(col, 10 + idx * columnWidth, yPosition, { maxWidth: columnWidth - 1, align: 'center' })
    })

    yPosition += 7
    doc.setTextColor(0)
    doc.setFontSize(9)

    // Table rows
    transactions.forEach((tx, idx) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage()
        yPosition = 10
      }

      const date = tx.date instanceof Date ? tx.date.toLocaleDateString() : tx.date
      const row = [
        date,
        tx.type,
        tx.symbol,
        tx.quantity.toString(),
        `$${tx.price.toFixed(2)}`,
        `$${tx.total.toFixed(2)}`,
      ]

      row.forEach((cell, colIdx) => {
        doc.text(cell, 10 + colIdx * columnWidth, yPosition, {
          maxWidth: columnWidth - 1,
          align: 'center',
        })
      })

      yPosition += 6
    })

    doc.save('transactions-report.pdf')
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Failed to generate PDF. Make sure jsPDF is installed.')
  }
}

/**
 * Check if jsPDF is available
 */
export const isPDFLibraryAvailable = async () => {
  try {
    await import('jspdf')
    return true
  } catch {
    return false
  }
}
