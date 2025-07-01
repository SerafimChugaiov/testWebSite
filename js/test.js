// Send request to server
function sendRequest(tabType, startDate, endDate) {
    console.log(`Loading test data for ${tabType} from ${startDate} to ${endDate}`);

    // ВСТАВЬТЕ ВАШИ ТЕСТОВЫЕ ДАННЫЕ ЗДЕСЬ
    const testData = {
        vendors: {
            data: {
                vendorItems: [
                    {
                        vendorName: "Tech Solutions Inc",
                        vendorType: "External",
                        credit: 125000,
                        debitAsAssociated: 15000,
                        debitToVendor: 95000,
                        totalDebit: 110000,
                        profitAmount: 15000,
                        profitPercentage: 12
                    },
                    {
                        vendorName: "Global Development Co",
                        vendorType: "Internal",
                        credit: 85000,
                        debitAsAssociated: 8000,
                        debitToVendor: 68000,
                        totalDebit: 76000,
                        profitAmount: 9000,
                        profitPercentage: 10.59
                    },
                    {
                        vendorName: "Digital Marketing Hub",
                        vendorType: "External",
                        credit: 67000,
                        debitAsAssociated: 12000,
                        debitToVendor: 48000,
                        totalDebit: 60000,
                        profitAmount: 7000,
                        profitPercentage: 10.45
                    },
                    {
                        vendorName: "CloudTech Systems",
                        vendorType: "External",
                        credit: 145000,
                        debitAsAssociated: 20000,
                        debitToVendor: 110000,
                        totalDebit: 130000,
                        profitAmount: 15000,
                        profitPercentage: 10.34
                    },
                    {
                        vendorName: "Innovation Labs",
                        vendorType: "Internal",
                        credit: 98000,
                        debitAsAssociated: 14000,
                        debitToVendor: 75000,
                        totalDebit: 89000,
                        profitAmount: 9000,
                        profitPercentage: 9.18
                    },
                    {
                        vendorName: "Smart Analytics Ltd",
                        vendorType: "External",
                        credit: 78000,
                        debitAsAssociated: 9000,
                        debitToVendor: 62000,
                        totalDebit: 71000,
                        profitAmount: 7000,
                        profitPercentage: 8.97
                    },
                    {
                        vendorName: "Web Design Studio",
                        vendorType: "External",
                        credit: 45000,
                        debitAsAssociated: 6000,
                        debitToVendor: 35000,
                        totalDebit: 41000,
                        profitAmount: 4000,
                        profitPercentage: 8.89
                    },
                    {
                        vendorName: "Data Processing Corp",
                        vendorType: "Internal",
                        credit: 112000,
                        debitAsAssociated: 16000,
                        debitToVendor: 88000,
                        totalDebit: 104000,
                        profitAmount: 8000,
                        profitPercentage: 7.14
                    },
                    {
                        vendorName: "Mobile App Developers",
                        vendorType: "External",
                        credit: 89000,
                        debitAsAssociated: 11000,
                        debitToVendor: 72000,
                        totalDebit: 83000,
                        profitAmount: 6000,
                        profitPercentage: 6.74
                    },
                    {
                        vendorName: "AI Research Group",
                        vendorType: "Internal",
                        credit: 156000,
                        debitAsAssociated: 22000,
                        debitToVendor: 125000,
                        totalDebit: 147000,
                        profitAmount: 9000,
                        profitPercentage: 5.77
                    },
                    {
                        vendorName: "Security Solutions Pro",
                        vendorType: "External",
                        credit: 134000,
                        debitAsAssociated: 18000,
                        debitToVendor: 108000,
                        totalDebit: 126000,
                        profitAmount: 8000,
                        profitPercentage: 5.97
                    },
                    {
                        vendorName: "Database Management LLC",
                        vendorType: "Internal",
                        credit: 76000,
                        debitAsAssociated: 10000,
                        debitToVendor: 62000,
                        totalDebit: 72000,
                        profitAmount: 4000,
                        profitPercentage: 5.26
                    },
                    {
                        vendorName: "Network Infrastructure Co",
                        vendorType: "External",
                        credit: 198000,
                        debitAsAssociated: 28000,
                        debitToVendor: 158000,
                        totalDebit: 186000,
                        profitAmount: 12000,
                        profitPercentage: 6.06
                    },
                    {
                        vendorName: "Quality Assurance Team",
                        vendorType: "Internal",
                        credit: 65000,
                        debitAsAssociated: 8000,
                        debitToVendor: 53000,
                        totalDebit: 61000,
                        profitAmount: 4000,
                        profitPercentage: 6.15
                    },
                    {
                        vendorName: "Business Intelligence Ltd",
                        vendorType: "External",
                        credit: 87000,
                        debitAsAssociated: 12000,
                        debitToVendor: 71000,
                        totalDebit: 83000,
                        profitAmount: 4000,
                        profitPercentage: 4.6
                    },
                    {
                        vendorName: "Content Management Systems",
                        vendorType: "External",
                        credit: 54000,
                        debitAsAssociated: 7000,
                        debitToVendor: 45000,
                        totalDebit: 52000,
                        profitAmount: 2000,
                        profitPercentage: 3.7
                    },
                    {
                        vendorName: "E-commerce Solutions",
                        vendorType: "Internal",
                        credit: 103000,
                        debitAsAssociated: 15000,
                        debitToVendor: 85000,
                        totalDebit: 100000,
                        profitAmount: 3000,
                        profitPercentage: 2.91
                    },
                    {
                        vendorName: "DevOps Automation",
                        vendorType: "External",
                        credit: 92000,
                        debitAsAssociated: 13000,
                        debitToVendor: 77000,
                        totalDebit: 90000,
                        profitAmount: 2000,
                        profitPercentage: 2.17
                    },
                    {
                        vendorName: "API Integration Services",
                        vendorType: "External",
                        credit: 115000,
                        debitAsAssociated: 17000,
                        debitToVendor: 96000,
                        totalDebit: 113000,
                        profitAmount: 2000,
                        profitPercentage: 1.74
                    },
                    {
                        vendorName: "Blockchain Technologies",
                        vendorType: "Internal",
                        credit: 167000,
                        debitAsAssociated: 25000,
                        debitToVendor: 140000,
                        totalDebit: 165000,
                        profitAmount: 2000,
                        profitPercentage: 1.2
                    }
                ]
            }
        },
        projects: {
            data: {
                projectItems: [
                    {
                        projectName: "Enterprise CRM System",
                        projectCategory: "Development",
                        credit: 450000,
                        debitToExternalVendors: 280000,
                        debitToInternalVendors: 120000,
                        totalDebit: 400000,
                        profitAmount: 50000,
                        profitPercentage: 11.11
                    },
                    {
                        projectName: "Mobile Banking App",
                        projectCategory: "Mobile Development",
                        credit: 380000,
                        debitToExternalVendors: 220000,
                        debitToInternalVendors: 130000,
                        totalDebit: 350000,
                        profitAmount: 30000,
                        profitPercentage: 7.89
                    },
                    {
                        projectName: "Data Analytics Platform",
                        projectCategory: "Analytics",
                        credit: 520000,
                        debitToExternalVendors: 340000,
                        debitToInternalVendors: 145000,
                        totalDebit: 485000,
                        profitAmount: 35000,
                        profitPercentage: 6.73
                    },
                    {
                        projectName: "E-learning Management System",
                        projectCategory: "Education Technology",
                        credit: 290000,
                        debitToExternalVendors: 180000,
                        debitToInternalVendors: 85000,
                        totalDebit: 265000,
                        profitAmount: 25000,
                        profitPercentage: 8.62
                    },
                    {
                        projectName: "Healthcare Portal",
                        projectCategory: "Healthcare IT",
                        credit: 675000,
                        debitToExternalVendors: 420000,
                        debitToInternalVendors: 200000,
                        totalDebit: 620000,
                        profitAmount: 55000,
                        profitPercentage: 8.15
                    },
                    {
                        projectName: "Supply Chain Optimization",
                        projectCategory: "Logistics",
                        credit: 395000,
                        debitToExternalVendors: 245000,
                        debitToInternalVendors: 125000,
                        totalDebit: 370000,
                        profitAmount: 25000,
                        profitPercentage: 6.33
                    },
                    {
                        projectName: "Real Estate Management Platform",
                        projectCategory: "Property Technology",
                        credit: 340000,
                        debitToExternalVendors: 210000,
                        debitToInternalVendors: 110000,
                        totalDebit: 320000,
                        profitAmount: 20000,
                        profitPercentage: 5.88
                    },
                    {
                        projectName: "IoT Device Management",
                        projectCategory: "Internet of Things",
                        credit: 485000,
                        debitToExternalVendors: 310000,
                        debitToInternalVendors: 155000,
                        totalDebit: 465000,
                        profitAmount: 20000,
                        profitPercentage: 4.12
                    },
                    {
                        projectName: "Financial Trading Platform",
                        projectCategory: "Fintech",
                        credit: 780000,
                        debitToExternalVendors: 500000,
                        debitToInternalVendors: 250000,
                        totalDebit: 750000,
                        profitAmount: 30000,
                        profitPercentage: 3.85
                    },
                    {
                        projectName: "Social Media Analytics Tool",
                        projectCategory: "Marketing Technology",
                        credit: 225000,
                        debitToExternalVendors: 140000,
                        debitToInternalVendors: 70000,
                        totalDebit: 210000,
                        profitAmount: 15000,
                        profitPercentage: 6.67
                    },
                    {
                        projectName: "Inventory Management System",
                        projectCategory: "Retail Technology",
                        credit: 315000,
                        debitToExternalVendors: 195000,
                        debitToInternalVendors: 100000,
                        totalDebit: 295000,
                        profitAmount: 20000,
                        profitPercentage: 6.35
                    },
                    {
                        projectName: "Video Streaming Platform",
                        projectCategory: "Media Technology",
                        credit: 625000,
                        debitToExternalVendors: 395000,
                        debitToInternalVendors: 205000,
                        totalDebit: 600000,
                        profitAmount: 25000,
                        profitPercentage: 4
                    },
                    {
                        projectName: "AI Chatbot Development",
                        projectCategory: "Artificial Intelligence",
                        credit: 270000,
                        debitToExternalVendors: 165000,
                        debitToInternalVendors: 90000,
                        totalDebit: 255000,
                        profitAmount: 15000,
                        profitPercentage: 5.56
                    },
                    {
                        projectName: "Blockchain Voting System",
                        projectCategory: "Blockchain",
                        credit: 550000,
                        debitToExternalVendors: 350000,
                        debitToInternalVendors: 180000,
                        totalDebit: 530000,
                        profitAmount: 20000,
                        profitPercentage: 3.64
                    },
                    {
                        projectName: "Cloud Migration Service",
                        projectCategory: "Cloud Computing",
                        credit: 420000,
                        debitToExternalVendors: 270000,
                        debitToInternalVendors: 135000,
                        totalDebit: 405000,
                        profitAmount: 15000,
                        profitPercentage: 3.57
                    },
                    {
                        projectName: "Cybersecurity Audit Tool",
                        projectCategory: "Security",
                        credit: 365000,
                        debitToExternalVendors: 230000,
                        debitToInternalVendors: 120000,
                        totalDebit: 350000,
                        profitAmount: 15000,
                        profitPercentage: 4.11
                    },
                    {
                        projectName: "Virtual Reality Training",
                        projectCategory: "VR/AR Technology",
                        credit: 480000,
                        debitToExternalVendors: 310000,
                        debitToInternalVendors: 160000,
                        totalDebit: 470000,
                        profitAmount: 10000,
                        profitPercentage: 2.08
                    },
                    {
                        projectName: "Smart City Dashboard",
                        projectCategory: "Government Technology",
                        credit: 695000,
                        debitToExternalVendors: 450000,
                        debitToInternalVendors: 235000,
                        totalDebit: 685000,
                        profitAmount: 10000,
                        profitPercentage: 1.44
                    },
                    {
                        projectName: "Telemedicine Platform",
                        projectCategory: "Healthcare IT",
                        credit: 405000,
                        debitToExternalVendors: 260000,
                        debitToInternalVendors: 135000,
                        totalDebit: 395000,
                        profitAmount: 10000,
                        profitPercentage: 2.47
                    },
                    {
                        projectName: "Automated Testing Framework",
                        projectCategory: "Quality Assurance",
                        credit: 185000,
                        debitToExternalVendors: 115000,
                        debitToInternalVendors: 65000,
                        totalDebit: 180000,
                        profitAmount: 5000,
                        profitPercentage: 2.7
                    }
                ]
            }
        },
        clients: {
            data: {
                clientItems: [
                    {
                        clientName: "TechCorp Industries",
                        clientType: "Corporate",
                        credit: 1250000,
                        debitToExternalVendors: 750000,
                        debitToInternalVendors: 350000,
                        totalDebit: 1100000,
                        profitAmount: 150000,
                        profitPercentage: 12
                    },
                    {
                        clientName: "Global Finance Solutions",
                        clientType: "Financial Services",
                        credit: 980000,
                        debitToExternalVendors: 580000,
                        debitToInternalVendors: 320000,
                        totalDebit: 900000,
                        profitAmount: 80000,
                        profitPercentage: 8.16
                    },
                    {
                        clientName: "HealthTech Medical Group",
                        clientType: "Healthcare",
                        credit: 1450000,
                        debitToExternalVendors: 870000,
                        debitToInternalVendors: 480000,
                        totalDebit: 1350000,
                        profitAmount: 100000,
                        profitPercentage: 6.9
                    },
                    {
                        clientName: "EduLearn University",
                        clientType: "Education",
                        credit: 675000,
                        debitToExternalVendors: 400000,
                        debitToInternalVendors: 225000,
                        totalDebit: 625000,
                        profitAmount: 50000,
                        profitPercentage: 7.41
                    },
                    {
                        clientName: "RetailMax Chain",
                        clientType: "Retail",
                        credit: 820000,
                        debitToExternalVendors: 490000,
                        debitToInternalVendors: 280000,
                        totalDebit: 770000,
                        profitAmount: 50000,
                        profitPercentage: 6.1
                    },
                    {
                        clientName: "Manufacturing United",
                        clientType: "Manufacturing",
                        credit: 1150000,
                        debitToExternalVendors: 690000,
                        debitToInternalVendors: 400000,
                        totalDebit: 1090000,
                        profitAmount: 60000,
                        profitPercentage: 5.22
                    },
                    {
                        clientName: "StartupHub Accelerator",
                        clientType: "Startup",
                        credit: 425000,
                        debitToExternalVendors: 255000,
                        debitToInternalVendors: 145000,
                        totalDebit: 400000,
                        profitAmount: 25000,
                        profitPercentage: 5.88
                    },
                    {
                        clientName: "Government Digital Services",
                        clientType: "Government",
                        credit: 1750000,
                        debitToExternalVendors: 1050000,
                        debitToInternalVendors: 620000,
                        totalDebit: 1670000,
                        profitAmount: 80000,
                        profitPercentage: 4.57
                    },
                    {
                        clientName: "Energy Solutions Corp",
                        clientType: "Energy",
                        credit: 965000,
                        debitToExternalVendors: 580000,
                        debitToInternalVendors: 340000,
                        totalDebit: 920000,
                        profitAmount: 45000,
                        profitPercentage: 4.66
                    },
                    {
                        clientName: "TransportLogistics Ltd",
                        clientType: "Transportation",
                        credit: 740000,
                        debitToExternalVendors: 445000,
                        debitToInternalVendors: 260000,
                        totalDebit: 705000,
                        profitAmount: 35000,
                        profitPercentage: 4.73
                    },
                    {
                        clientName: "MediaStream Entertainment",
                        clientType: "Media",
                        credit: 885000,
                        debitToExternalVendors: 530000,
                        debitToInternalVendors: 315000,
                        totalDebit: 845000,
                        profitAmount: 40000,
                        profitPercentage: 4.52
                    },
                    {
                        clientName: "RealEstate Ventures",
                        clientType: "Real Estate",
                        credit: 620000,
                        debitToExternalVendors: 375000,
                        debitToInternalVendors: 215000,
                        totalDebit: 590000,
                        profitAmount: 30000,
                        profitPercentage: 4.84
                    },
                    {
                        clientName: "Insurance Partners Group",
                        clientType: "Insurance",
                        credit: 560000,
                        debitToExternalVendors: 340000,
                        debitToInternalVendors: 195000,
                        totalDebit: 535000,
                        profitAmount: 25000,
                        profitPercentage: 4.46
                    },
                    {
                        clientName: "TravelTech Innovations",
                        clientType: "Travel & Tourism",
                        credit: 445000,
                        debitToExternalVendors: 270000,
                        debitToInternalVendors: 155000,
                        totalDebit: 425000,
                        profitAmount: 20000,
                        profitPercentage: 4.49
                    },
                    {
                        clientName: "AgriTech Solutions",
                        clientType: "Agriculture",
                        credit: 385000,
                        debitToExternalVendors: 235000,
                        debitToInternalVendors: 135000,
                        totalDebit: 370000,
                        profitAmount: 15000,
                        profitPercentage: 3.9
                    },
                    {
                        clientName: "SportsTech Analytics",
                        clientType: "Sports & Recreation",
                        credit: 295000,
                        debitToExternalVendors: 180000,
                        debitToInternalVendors: 105000,
                        totalDebit: 285000,
                        profitAmount: 10000,
                        profitPercentage: 3.39
                    },
                    {
                        clientName: "NonProfit Foundation",
                        clientType: "Non-Profit",
                        credit: 175000,
                        debitToExternalVendors: 110000,
                        debitToInternalVendors: 60000,
                        totalDebit: 170000,
                        profitAmount: 5000,
                        profitPercentage: 2.86
                    },
                    {
                        clientName: "FoodTech Delivery",
                        clientType: "Food & Beverage",
                        credit: 325000,
                        debitToExternalVendors: 200000,
                        debitToInternalVendors: 115000,
                        totalDebit: 315000,
                        profitAmount: 10000,
                        profitPercentage: 3.08
                    },
                    {
                        clientName: "LegalTech Services",
                        clientType: "Legal Services",
                        credit: 275000,
                        debitToExternalVendors: 170000,
                        debitToInternalVendors: 95000,
                        totalDebit: 265000,
                        profitAmount: 10000,
                        profitPercentage: 3.64
                    },
                    {
                        clientName: "ConsultingPro Advisory",
                        clientType: "Consulting",
                        credit: 195000,
                        debitToExternalVendors: 120000,
                        debitToInternalVendors: 70000,
                        totalDebit: 190000,
                        profitAmount: 5000,
                        profitPercentage: 2.56
                    }
                ]
            }
        }
    };

    // Симуляция задержки сети
    setTimeout(() => {
        const data = testData[tabType];
        if (data) {
            console.log(`Received test data for ${tabType}:`, data);
            renderTable(tabType, data);
        } else {
            showError(tabType, `No test data found for ${tabType}`);
        }
    }, 500); // 500ms задержка для имитации сетевого запроса
}