import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Master-data/Role'

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const datarole = [
      {
        company: "RMP",
        code: "RMP-MKTGDSGN-HOF",
        rolename: "Head of Marketing & Design",
        coderole: "RMP-MKTGDSGN-HOF - Head of Marketing & Design"
      },
      {
        company: "RMP",
        code: "RMP-SLS-STAFF2",
        rolename: "Sales 2",
        coderole: "RMP-SLS-STAFF2 - Sales 2"
      },
      {
        company: "RMP",
        code: "OB",
        rolename: "Office Boy",
        coderole: "OB - Office Boy"
      },
      {
        company: "RMP",
        code: "LV",
        rolename: "Live Streaming",
        coderole: "LV - Live Streaming"
      },
      {
        company: "RMP",
        code: "SAL",
        rolename: "Sales RMP",
        coderole: "SAL - Sales RMP"
      },
      {
        company: "RMP",
        code: "STF-P-RMP",
        rolename: "Staff Pajak RMP",
        coderole: "STF-P-RMP - Staff Pajak RMP"
      },
      {
        company: "RMP",
        code: "STF-S-RMP",
        rolename: "Staff Socmed RMP",
        coderole: "STF-S-RMP - Staff Socmed RMP"
      },
      {
        company: "RMP",
        code: "RMP-ADMSLS-STAFF",
        rolename: "Sales & Online Admin Staff",
        coderole: "RMP-ADMSLS-STAFF - Sales & Online Admin Staff"
      },
      {
        company: "RMP",
        code: "HELP",
        rolename: "Helper",
        coderole: "HELP - Helper"
      },
      {
        company: "RMP",
        code: "SEC",
        rolename: "Security KAS",
        coderole: "SEC - Security KAS"
      },
      {
        company: "RMP",
        code: "SLS",
        rolename: "Sales MPM",
        coderole: "SLS - Sales MPM"
      },
      {
        company: "RMP",
        code: "SSL",
        rolename: "Sales Global",
        coderole: "SSL - Sales Global"
      },
      {
        company: "RMP",
        code: "LOAD",
        rolename: "Loader",
        coderole: "LOAD - Loader"
      },
      {
        company: "RMP",
        code: "TIMAUTO",
        rolename: "Tim Gudang",
        coderole: "TIMAUTO - Tim Gudang"
      },
      {
        company: "RMP",
        code: "CHECK",
        rolename: "Checker",
        coderole: "CHECK - Checker"
      },
      {
        company: "RMP",
        code: "BONG",
        rolename: "Bongkar Muat",
        coderole: "BONG - Bongkar Muat"
      },
      {
        company: "RMP",
        code: "DRV",
        rolename: "Driver",
        coderole: "DRV - Driver"
      },
      {
        company: "RMP",
        code: "ASST DRIV",
        rolename: "Asst Driver",
        coderole: "ASST DRIV - Asst Driver"
      },
      {
        company: "RMP",
        code: "RMP-FTA-ADM",
        rolename: "Finance, Tax and Accounting Staff",
        coderole: "RMP-FTA-ADM - Finance, Tax and Accounting Staff"
      },
      {
        company: "RMP",
        code: "RMP-FTA-KAS",
        rolename: "Kasir",
        coderole: "RMP-FTA-KAS - Kasir"
      },
      {
        company: "RMP",
        code: "KOOR LOAD",
        rolename: "Loader Coordinator",
        coderole: "KOOR LOAD - Loader Coordinator"
      },
      {
        company: "RMP",
        code: "KOOR REC",
        rolename: "Receiver Coordinator",
        coderole: "KOOR REC - Receiver Coordinator"
      },
      {
        company: "RMP",
        code: "KOOR FLOOR",
        rolename: "Floor Coordinator",
        coderole: "KOOR FLOOR - Floor Coordinator"
      },
      {
        company: "RMP",
        code: "INVENTORY",
        rolename: "Inventory Staff",
        coderole: "INVENTORY - Inventory Staff"
      },
      {
        company: "RMP",
        code: "PICK",
        rolename: "Picker Reseller Coordinator",
        coderole: "PICK - Picker Reseller Coordinator"
      },
      {
        company: "RMP",
        code: "STF FLOOR",
        rolename: "Floor Staff",
        coderole: "STF FLOOR - Floor Staff"
      },
      {
        company: "RMP",
        code: "PICK RET",
        rolename: "Picker Retail",
        coderole: "PICK RET - Picker Retail"
      },
      {
        company: "RMP",
        code: "PICK RES",
        rolename: "Picker Reseller",
        coderole: "PICK RES - Picker Reseller"
      },
      {
        company: "RMP",
        code: "REC",
        rolename: "Receiver",
        coderole: "REC - Receiver"
      },
      {
        company: "RMP",
        code: "PACKER",
        rolename: "Packer",
        coderole: "PACKER - Packer"
      },
      {
        company: "RMP",
        code: "RECEP",
        rolename: "Receptionist",
        coderole: "RECEP - Receptionist"
      },
      {
        company: "RMP",
        code: "KUR",
        rolename: "Kurir",
        coderole: "KUR - Kurir"
      },
      {
        company: "ERKA",
        code: "SPV-M-RMP",
        rolename: "Supervisor Marketing RMP",
        coderole: "SPV-M-RMP - Supervisor Marketing RMP"
      },
      {
        company: "ERKA",
        code: "SAL-2-RMP",
        rolename: "Sales RMP 2",
        coderole: "SAL-2-RMP - Sales RMP 2"
      },
      {
        company: "ERKA",
        code: "DES-RMP",
        rolename: "Designer RMP",
        coderole: "DES-RMP - Designer RMP"
      },
      {
        company: "RMP",
        code: "WH-RMP-ADM",
        rolename: "Warehouse Admin RMP",
        coderole: "WH-RMP-ADM - Warehouse Admin RMP"
      },
      {
        company: "RMP",
        code: "SAL-SPV-RMP2",
        rolename: "Supervisor Marketing RMP 2",
        coderole: "SAL-SPV-RMP2 - Supervisor Marketing RMP 2"
      },
      {
        company: "RMP",
        code: "STF-P-RMP2",
        rolename: "Staff Pajak RMP 2",
        coderole: "STF-P-RMP2 - Staff Pajak RMP 2"
      },
      {
        company: "RMP",
        code: "STF-S-RMP2",
        rolename: "Staff Socmed RMP 2",
        coderole: "STF-S-RMP2 - Staff Socmed RMP 2"
      },
      {
        company: "RMP",
        code: "RMP-Staff-MKT",
        rolename: "Marketing Staff",
        coderole: "RMP-Staff-MKT - Marketing Staff"
      },
      {
        company: "RMP",
        code: "RMP-OB",
        rolename: "Office Boy",
        coderole: "RMP-OB - Office Boy"
      },
      {
        company: "RMP",
        code: "RMP-SEC",
        rolename: "Secretary",
        coderole: "RMP-SEC - Secretary"
      },
      {
        company: "RMP",
        code: "RMP-PACK",
        rolename: "Packer",
        coderole: "RMP-PACK - Packer"
      },
      {
        company: "MPM",
        code: "MPM-DIRUT",
        rolename: "Direktur Utama",
        coderole: "MPM-DIRUT - Direktur Utama"
      },
      {
        company: "MPM",
        code: "MPM-DIRSLSMKTG",
        rolename: "Direktur Sales & Marketing",
        coderole: "MPM-DIRSLSMKTG - Direktur Sales & Marketing"
      },
      {
        company: "MPM",
        code: "MPM-DIROP",
        rolename: "Direktur Operasional",
        coderole: "MPM-DIROP - Direktur Operasional"
      },
      {
        company: "MPM",
        code: "MPM-TA-MGR",
        rolename: "Accounting & Tax Manager",
        coderole: "MPM-TA-MGR - Accounting & Tax Manager"
      },
      {
        company: "MPM",
        code: "MPM-TA-SPV",
        rolename: "Accounting & Tax Supervisor",
        coderole: "MPM-TA-SPV - Accounting & Tax Supervisor"
      },
      {
        company: "MPM",
        code: "MPM-TA-ACCSTAFF",
        rolename: "Accounting Staff",
        coderole: "MPM-TA-ACCSTAFF - Accounting Staff"
      },
      {
        company: "MPM",
        code: "MPM-TA-TAXSTAFF",
        rolename: "Tax Staff",
        coderole: "MPM-TA-TAXSTAFF - Tax Staff"
      },
      {
        company: "MPM",
        code: "MPM-TA-TAXADM",
        rolename: "Tax Admin Staff",
        coderole: "MPM-TA-TAXADM - Tax Admin Staff"
      },
      {
        company: "MPM",
        code: "MPM-DSGN-MGR",
        rolename: "Design Manager",
        coderole: "MPM-DSGN-MGR - Design Manager"
      },
      {
        company: "JKT",
        code: '119',
        rolename: "Direktur Operasional",
        coderole: "119 - Direktur Operasional"
      },
      {
        company: "RMP",
        code: '131',
        rolename: "Direktur Sales & Marketing ",
        coderole: "131 - Direktur Sales & Marketing "
      },
      {
        company: "RMP",
        code: "STF",
        rolename: "Staff",
        coderole: "STF - Staff"
      },
      {
        company: "RMP",
        code: "AEST",
        rolename: "General Manager Aesthetic",
        coderole: "AEST - General Manager Aesthetic"
      },
      {
        company: "RMP",
        code: "KSR",
        rolename: "Kasir",
        coderole: "KSR - Kasir"
      },
      {
        company: "RMP",
        code: "HOSP",
        rolename: "Sales Hospital",
        coderole: "HOSP - Sales Hospital"
      },
      {
        company: "MPM",
        code: "MPM-DSGN-STAFF",
        rolename: "Design Staff",
        coderole: "MPM-DSGN-STAFF - Design Staff"
      },
      {
        company: "RMP",
        code: "RMP-MKTGDSGN-SPV",
        rolename: "SPV Marketing & Design",
        coderole: "RMP-MKTGDSGN-SPV - SPV Marketing & Design"
      },
      {
        company: "MPM",
        code: "RMP-STAFF-DSGN2",
        rolename: "Design Staff 2",
        coderole: "RMP-STAFF-DSGN2 - Design Staff 2"
      },
      {
        company: "MPM",
        code: "RMP-STAFF-MKT2",
        rolename: "Marketing Staff 2",
        coderole: "RMP-STAFF-MKT2 - Marketing Staff 2"
      },
      {
        company: "MPM",
        code: "MPM-FIN-MGR",
        rolename: "Finance Manager",
        coderole: "MPM-FIN-MGR - Finance Manager"
      },
      {
        company: "MPM",
        code: "MPM-FIN-ARSPV",
        rolename: "AR Supervisor",
        coderole: "MPM-FIN-ARSPV - AR Supervisor"
      },
      {
        company: "MPM",
        code: "MPM-FIN-ARSTAFF",
        rolename: "AR Staff",
        coderole: "MPM-FIN-ARSTAFF - AR Staff"
      },
      {
        company: "MPM",
        code: "MPM-FIN-COLLCOOR",
        rolename: "Collector Coordinator",
        coderole: "MPM-FIN-COLLCOOR - Collector Coordinator"
      },
      {
        company: "MPM",
        code: "MPM-FIN-COLL",
        rolename: "Collector",
        coderole: "MPM-FIN-COLL - Collector"
      },
      {
        company: "MPM",
        code: "MPM-FIN-APSPV",
        rolename: "AP Supervisor",
        coderole: "MPM-FIN-APSPV - AP Supervisor"
      },
      {
        company: "MPM",
        code: "MPM-FIN-KAS",
        rolename: "Kasir",
        coderole: "MPM-FIN-KAS - Kasir"
      },
      {
        company: "MPM",
        code: "MPM-HRGALCOM-MGR",
        rolename: "HRGAL & Compliance Manager",
        coderole: "MPM-HRGALCOM-MGR - HRGAL & Compliance Manager"
      },
      {
        company: "MPM",
        code: "MPM-HRGALCOM-LGLCOMPSPV",
        rolename: "Legal & Compliance Sueprvisor",
        coderole: "MPM-HRGALCOM-LGLCOMPSPV - Legal & Compliance Sueprvisor"
      },
      {
        company: "MPM",
        code: "MPM-HRGALCOM-LGLSTAFF",
        rolename: "Legal Staff",
        coderole: "MPM-HRGALCOM-LGLSTAFF - Legal Staff"
      },
      {
        company: "MPM",
        code: "MPM-HRGALCOM-COMPSTAFF",
        rolename: "Compliance Staff",
        coderole: "MPM-HRGALCOM-COMPSTAFF - Compliance Staff"
      },
      {
        company: "MPM",
        code: "MPM-HRGALCOM-HRGACOOR",
        rolename: "HR&GA Coordinator",
        coderole: "MPM-HRGALCOM-HRGACOOR - HR&GA Coordinator"
      },
      {
        company: "MPM",
        code: "MPM-HRGALCOM-HRSTAFF",
        rolename: "HRD Staff",
        coderole: "MPM-HRGALCOM-HRSTAFF - HRD Staff"
      },
      {
        company: "MPM",
        code: "MPM-HRGALCOM-GASTAFF",
        rolename: "GA Staff",
        coderole: "MPM-HRGALCOM-GASTAFF - GA Staff"
      },
      {
        company: "MPM",
        code: "MPM-HRGALCOM-Reception",
        rolename: "Receptionist",
        coderole: "MPM-HRGALCOM-Reception - Receptionist"
      },
      {
        company: "MPM",
        code: "MPM-HRGALCOM-OB",
        rolename: "Office Boy",
        coderole: "MPM-HRGALCOM-OB - Office Boy"
      },
      {
        company: "MPM",
        code: "MPM-HRGALCOM-OBCOOR",
        rolename: "Office Boy Coordinator",
        coderole: "MPM-HRGALCOM-OBCOOR - Office Boy Coordinator"
      },
      {
        company: "MPM",
        code: "MPM-HRGALCOM-DRIVER",
        rolename: "Driver",
        coderole: "MPM-HRGALCOM-DRIVER - Driver"
      },
      {
        company: "MPM",
        code: "MPM-HRGALCOM-SECCOOR",
        rolename: "Security Coordinator",
        coderole: "MPM-HRGALCOM-SECCOOR - Security Coordinator"
      },
      {
        company: "MPM",
        code: "MPM-HRGALCOM-SEC",
        rolename: "Security",
        coderole: "MPM-HRGALCOM-SEC - Security"
      },
      {
        company: "MPM",
        code: "MPM-IMPORT-MGR",
        rolename: "Import Manager",
        coderole: "MPM-IMPORT-MGR - Import Manager"
      },
      {
        company: "MPM",
        code: "MPM-IMPORT-STAFF",
        rolename: "Import Staff",
        coderole: "MPM-IMPORT-STAFF - Import Staff"
      },
      {
        company: "MPM",
        code: "MPM-IC-MGR",
        rolename: "Internal Control Manager",
        coderole: "MPM-IC-MGR - Internal Control Manager"
      },
      {
        company: "MPM",
        code: "MPM-IC-SPV",
        rolename: "Internal Control Supervisor",
        coderole: "MPM-IC-SPV - Internal Control Supervisor"
      },
      {
        company: "MPM",
        code: "MPM-IC-STAFF",
        rolename: "Internal Control Staff",
        coderole: "MPM-IC-STAFF - Internal Control Staff"
      },
      {
        company: "MPM",
        code: "MPM-IT-MGR",
        rolename: "IT Manager",
        coderole: "MPM-IT-MGR - IT Manager"
      },
      {
        company: "MPM",
        code: "MPM-MARCOM-MGR",
        rolename: "Marketing Communication Manager",
        coderole: "MPM-MARCOM-MGR - Marketing Communication Manager"
      },
      {
        company: "MPM",
        code: "MPM-MARCOM-SPV",
        rolename: "Marketing Communication Supervisor",
        coderole: "MPM-MARCOM-SPV - Marketing Communication Supervisor"
      },
      {
        company: "MPM",
        code: "MPM-MARCOM-DSGNSTAFF",
        rolename: "Design Graphic Staff",
        coderole: "MPM-MARCOM-DSGNSTAFF - Design Graphic Staff"
      },
      {
        company: "MPM",
        code: "MPM-MARCOM-GDGECOM",
        rolename: "Staff Gudang E-Commerce",
        coderole: "MPM-MARCOM-GDGECOM - Staff Gudang E-Commerce"
      },
      {
        company: "MPM",
        code: "MPM-MARCOM-DIGSTRSTAFF",
        rolename: "Digital Strategic Staff",
        coderole: "MPM-MARCOM-DIGSTRSTAFF - Digital Strategic Staff"
      },
      {
        company: "MPM",
        code: "MPM-PURCH-MGR",
        rolename: "Purchasing Manager",
        coderole: "MPM-PURCH-MGR - Purchasing Manager"
      },
      {
        company: "MPM",
        code: "MPM-PURCH-IMPSTAFF",
        rolename: "Purchasing Import Staff",
        coderole: "MPM-PURCH-IMPSTAFF - Purchasing Import Staff"
      },
      {
        company: "MPM",
        code: "MPM-PURCH-LOCSTAFF",
        rolename: "Purchasing Lokal Staff",
        coderole: "MPM-PURCH-LOCSTAFF - Purchasing Lokal Staff"
      },
      {
        company: "MPM",
        code: "MPM-SALES-MGR",
        rolename: "Sales Manager",
        coderole: "MPM-SALES-MGR - Sales Manager"
      },
      {
        company: "MPM",
        code: "MPM-SALES-SPVREG1",
        rolename: "Sales Supervisor Regional I",
        coderole: "MPM-SALES-SPVREG1 - Sales Supervisor Regional I"
      },
      {
        company: "MPM",
        code: "MPM-SALES-SPVREG2",
        rolename: "Sales Supervisor Regional II",
        coderole: "MPM-SALES-SPVREG2 - Sales Supervisor Regional II"
      },
      {
        company: "MPM",
        code: "MPM-SALES-STAFF",
        rolename: "Sales Staff",
        coderole: "MPM-SALES-STAFF - Sales Staff"
      },
      {
        company: "MPM",
        code: "MPM-SALADM-MGR",
        rolename: "Sales Admin Manager",
        coderole: "MPM-SALADM-MGR - Sales Admin Manager"
      },
      {
        company: "MPM",
        code: "MPM-SALADM-SPV",
        rolename: "Sales Admin Supervisor",
        coderole: "MPM-SALADM-SPV - Sales Admin Supervisor"
      },
      {
        company: "MPM",
        code: "MPM-SALADM-STAFF",
        rolename: "Sales Admin Staff",
        coderole: "MPM-SALADM-STAFF - Sales Admin Staff"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-MGR",
        rolename: "Warehouse Manager",
        coderole: "MPM-WHCIK-MGR - Warehouse Manager"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-ADMSPV",
        rolename: "Admin Warehouse Supervisor",
        coderole: "MPM-WHCIK-ADMSPV - Admin Warehouse Supervisor"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-ADMSTAFF",
        rolename: "Admin Warehouse Staff",
        coderole: "MPM-WHCIK-ADMSTAFF - Admin Warehouse Staff"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-INVSPV",
        rolename: "Inventory Supervisor",
        coderole: "MPM-WHCIK-INVSPV - Inventory Supervisor"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-INVSTAFF",
        rolename: "Inventory Staff",
        coderole: "MPM-WHCIK-INVSTAFF - Inventory Staff"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-PICKRETCOOR",
        rolename: "Picker Retail Coordinator",
        coderole: "MPM-WHCIK-PICKRETCOOR - Picker Retail Coordinator"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-PICKRETSTAFF",
        rolename: "Picker Retail Staff",
        coderole: "MPM-WHCIK-PICKRETSTAFF - Picker Retail Staff"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-PICKRESSCOOR",
        rolename: "Picker Reseller Coordinator",
        coderole: "MPM-WHCIK-PICKRESSCOOR - Picker Reseller Coordinator"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-PICKRESSSTAFF",
        rolename: "Picker Reseller Staff",
        coderole: "MPM-WHCIK-PICKRESSSTAFF - Picker Reseller Staff"
      },
      {
        company: "MPM",
        code: "MPM-IT-STAFF",
        rolename: "IT Staff 1",
        coderole: "MPM-IT-STAFF - IT Staff 1"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-TECHCOOR",
        rolename: "Technician Coordinator",
        coderole: "MPM-WHCIK-TECHCOOR - Technician Coordinator"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-TECHSTAFF",
        rolename: "Technician Staff",
        coderole: "MPM-WHCIK-TECHSTAFF - Technician Staff"
      },
      {
        company: "MPM",
        code: "MPM-HRGALCOM-HRGASPV",
        rolename: "HR Supervisor",
        coderole: "MPM-HRGALCOM-HRGASPV - HR Supervisor"
      },
      {
        company: "RMP",
        code: "RMP-STAFF-DSGN",
        rolename: "Design Staff 1",
        coderole: "RMP-STAFF-DSGN - Design Staff 1"
      },
      {
        company: "RMP",
        code: "RMP-SLS-STAFF",
        rolename: "Sales 1",
        coderole: "RMP-SLS-STAFF - Sales 1"
      },
      {
        company: "RMP",
        code: "MGR",
        rolename: "Manager",
        coderole: "MGR - Manager"
      },
      {
        company: "MPM",
        code: "MPM-PM-MGR",
        rolename: "Product Marketing and Development Manager",
        coderole: "MPM-PM-MGR - Product Marketing and Development Manager"
      },
      {
        company: "MPM",
        code: "MPM-PM-SPV",
        rolename: "Product Marketing & Development Supervisor",
        coderole: "MPM-PM-SPV - Product Marketing & Development Supervisor"
      },
      {
        company: "RMP",
        code: "REG MGR",
        rolename: "Regional Manager West Area",
        coderole: "REG MGR - Regional Manager West Area"
      },
      {
        company: "RMP",
        code: "RMP-DIRUT",
        rolename: "Direktur Utama",
        coderole: "RMP-DIRUT - Direktur Utama"
      },
      {
        company: "RMP",
        code: "REG EAST",
        rolename: "Regional Manager East Area",
        coderole: "REG EAST - Regional Manager East Area"
      },
      {
        company: "RMP",
        code: "SPV",
        rolename: "Supervisor",
        coderole: "SPV - Supervisor"
      },
      {
        company: "JKT",
        code: "118",
        rolename: "Direktur Utama",
        coderole: "118 - Direktur Utama"
      },
      {
        company: "JKT",
        code: "Pos",
        rolename: "Position",
        coderole: "Pos - Position"
      },
      {
        company: "RMP",
        code: "KOOR",
        rolename: "Koordinator",
        coderole: "KOOR - Koordinator"
      },
      {
        company: "RMP",
        code: "ADM",
        rolename: "Admin",
        coderole: "ADM - Admin"
      },
      {
        company: "RMP",
        code: "HD",
        rolename: "Head Of",
        coderole: "HD - Head Of"
      },
      {
        company: "RMP",
        code: "GM",
        rolename: "General Manager MPM",
        coderole: "GM - General Manager MPM"
      },
      {
        company: "RMP",
        code: "GMG",
        rolename: "General Manager Global",
        coderole: "GMG - General Manager Global"
      },
      {
        company: "RMP",
        code: "MSR",
        rolename: "Messenger",
        coderole: "MSR - Messenger"
      },
      {
        company: "RMP",
        code: "LAB",
        rolename: "Sales Laboratorium",
        coderole: "LAB - Sales Laboratorium"
      },
      {
        company: "RMP",
        code: "AST",
        rolename: "Sales Aesthetic",
        coderole: "AST - Sales Aesthetic"
      },
      {
        company: "RMP",
        code: "RMP-SLS-SPV",
        rolename: "Sales Supervisor",
        coderole: "RMP-SLS-SPV - Sales Supervisor"
      },
      {
        company: "RMP",
        code: "AS",
        rolename: "Assistant Manager Hospital",
        coderole: "AS - Assistant Manager Hospital"
      },
      {
        company: "RMP",
        code: "ASLAB",
        rolename: "Assistant Manager Lab",
        coderole: "ASLAB - Assistant Manager Lab"
      },
      {
        company: "RMP",
        code: "MHOS",
        rolename: "Manager Hospital",
        coderole: "MHOS - Manager Hospital"
      },
      {
        company: "RMP",
        code: "MLAB",
        rolename: "Manager Lab",
        coderole: "MLAB - Manager Lab"
      },
      {
        company: "RMP",
        code: "SALAB",
        rolename: "Sales Lab",
        coderole: "SALAB - Sales Lab"
      },
      {
        company: "RMP",
        code: "MGAES",
        rolename: "Manager Aesthetic",
        coderole: "MGAES - Manager Aesthetic"
      },
      {
        company: "RMP",
        code: "TEK",
        rolename: "Teknisi",
        coderole: "TEK - Teknisi"
      },
      {
        company: "RMP",
        code: "RMP-ADMSLS-SPV",
        rolename: "Sales & Online Admin Supervisor",
        coderole: "RMP-ADMSLS-SPV - Sales & Online Admin Supervisor"
      },
      {
        company: "RMP",
        code: "SCR",
        rolename: "Secretary",
        coderole: "SCR - Secretary"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-FLCOOR",
        rolename: "Floor Coordinator",
        coderole: "MPM-WHCIK-FLCOOR - Floor Coordinator"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-FLSTAFF",
        rolename: "Floor Staff",
        coderole: "MPM-WHCIK-FLSTAFF - Floor Staff"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-LOADCOOR",
        rolename: "Loading Coordinator",
        coderole: "MPM-WHCIK-LOADCOOR - Loading Coordinator"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-LOADSTAFF",
        rolename: "Loading Staff",
        coderole: "MPM-WHCIK-LOADSTAFF - Loading Staff"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-RECEIVCOOR",
        rolename: "Receiver Coordinator",
        coderole: "MPM-WHCIK-RECEIVCOOR - Receiver Coordinator"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-RECEIVSTAFF",
        rolename: "Receiver Staff",
        coderole: "MPM-WHCIK-RECEIVSTAFF - Receiver Staff"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-PACK",
        rolename: "Packer",
        coderole: "MPM-WHCIK-PACK - Packer"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-OPFOR",
        rolename: "Operator Forklift",
        coderole: "MPM-WHCIK-OPFOR - Operator Forklift"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-MESS",
        rolename: "Messenger Gudang",
        coderole: "MPM-WHCIK-MESS - Messenger Gudang"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-DRIVWH",
        rolename: "Driver Warehouse",
        coderole: "MPM-WHCIK-DRIVWH - Driver Warehouse"
      },
      {
        company: "MPM",
        code: "RMP-STAFF-MKT3",
        rolename: "Marketing Staff 3",
        coderole: "RMP-STAFF-MKT3 - Marketing Staff 3"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-CHECK",
        rolename: "Checker 1",
        coderole: "MPM-WHCIK-CHECK - Checker 1"
      },
      {
        company: "RMP",
        code: "RMP-ADMSLS-STAFF2",
        rolename: "Sales & Online Admin Staff 2",
        coderole: "RMP-ADMSLS-STAFF2 - Sales & Online Admin Staff 2"
      },
      {
        company: "RMP",
        code: "RMP-WH-ADM",
        rolename: "Warehouse Admin RMP",
        coderole: "RMP-WH-ADM - Warehouse Admin RMP"
      },
      {
        company: "RMP",
        code: "RMP-ADMSLS-STAFF3",
        rolename: "Sales & Online Admin Staff 3",
        coderole: "RMP-ADMSLS-STAFF3 - Sales & Online Admin Staff 3"
      },
      {
        company: "MPM",
        code: "AMPM-LOG-MESS2",
        rolename: "Messenger 2",
        coderole: "AMPM-LOG-MESS2 - Messenger 2"
      },
      {
        company: "MPM",
        code: "MPM-OUTSOURCE",
        rolename: "Outsourcing",
        coderole: "MPM-OUTSOURCE - Outsourcing"
      },
      {
        company: "MPM",
        code: "EK-DIRUT",
        rolename: "Direktur Utama",
        coderole: "EK-DIRUT - Direktur Utama"
      },
      {
        company: "MPM",
        code: "EK-GM-MED",
        rolename: "Medical General Manager",
        coderole: "EK-GM-MED - Medical General Manager"
      },
      {
        company: "MPM",
        code: "EK-GM-AES",
        rolename: "Aesthetic General Manager",
        coderole: "EK-GM-AES - Aesthetic General Manager"
      },
      {
        company: "MPM",
        code: "EK-GM-SC",
        rolename: "Skincare General Manager",
        coderole: "EK-GM-SC - Skincare General Manager"
      },
      {
        company: "MPM",
        code: "EK-FIN-STAFF",
        rolename: "Finance Staff",
        coderole: "EK-FIN-STAFF - Finance Staff"
      },
      {
        company: "MPM",
        code: "EK-WH-HELP",
        rolename: "Warehouse Helper",
        coderole: "EK-WH-HELP - Warehouse Helper"
      },
      {
        company: "MPM",
        code: "EK-WH-ADM",
        rolename: "Staff Adm WH",
        coderole: "EK-WH-ADM - Staff Adm WH"
      },
      {
        company: "MPM",
        code: "EK-ADMSLS-STAFF",
        rolename: "Staff Admin Sales & Marketing",
        coderole: "EK-ADMSLS-STAFF - Staff Admin Sales & Marketing"
      },
      {
        company: "MPM",
        code: "EK-SLSHOS-MGR",
        rolename: "Sales & Marketing Manager - Hospital Division",
        coderole: "EK-SLSHOS-MGR - Sales & Marketing Manager - Hospital Division"
      },
      {
        company: "MPM",
        code: "EK-SLSHOS-ASSMAN",
        rolename: "Ass Sales & Marketing Manager - Hospital Division",
        coderole: "EK-SLSHOS-ASSMAN - Ass Sales & Marketing Manager - Hospital Division"
      },
      {
        company: "MPM",
        code: "EK-SLSHOS-STAFF",
        rolename: "Sales & Marketing Staff - Hospital Division",
        coderole: "EK-SLSHOS-STAFF - Sales & Marketing Staff - Hospital Division"
      },
      {
        company: "MPM",
        code: "EK-SLSDIS-MGR",
        rolename: "Sales & Marketing Manager - Disposal Division",
        coderole: "EK-SLSDIS-MGR - Sales & Marketing Manager - Disposal Division"
      },
      {
        company: "MPM",
        code: "EK-SLSDIS-SPV",
        rolename: "Sales & Marketing Supervisor - Disposable Division",
        coderole: "EK-SLSDIS-SPV - Sales & Marketing Supervisor - Disposable Division"
      },
      {
        company: "MPM",
        code: "EK-SLSDIS-STAFF",
        rolename: "Sales & Marketing Staff - Disposable Division",
        coderole: "EK-SLSDIS-STAFF - Sales & Marketing Staff - Disposable Division"
      },
      {
        company: "MPM",
        code: "EK-SLSUN-MGR",
        rolename: "Sales & Marketing Manager - Unit Division",
        coderole: "EK-SLSUN-MGR - Sales & Marketing Manager - Unit Division"
      },
      {
        company: "GAE",
        code: "GAE-WORKS-SPV",
        rolename: "Supervisor Workshop",
        coderole: "GAE-WORKS-SPV - Supervisor Workshop"
      },
      {
        company: "GAE",
        code: "GAE-TECH-MGR",
        rolename: "Manager Teknisi",
        coderole: "GAE-TECH-MGR - Manager Teknisi"
      },
      {
        company: "MPM",
        code: "EK-SLSUN-STAFF",
        rolename: "Sales & Marketing Staff - Unit Division",
        coderole: "EK-SLSUN-STAFF - Sales & Marketing Staff - Unit Division"
      },
      {
        company: "MPM",
        code: "EK-SLSDEAL-MGR",
        rolename: "Sales & Marketing Manager - Dealer Division",
        coderole: "EK-SLSDEAL-MGR - Sales & Marketing Manager - Dealer Division"
      },
      {
        company: "MPM",
        code: "EK-SLSDEAL-STAFF",
        rolename: "Sales & Marketing Staff - Dealer Division",
        coderole: "EK-SLSDEAL-STAFF - Sales & Marketing Staff - Dealer Division"
      },
      {
        company: "MPM",
        code: "EK-SLSLAB-MGR",
        rolename: "Sales & Marketing Manager - Lab Division",
        coderole: "EK-SLSLAB-MGR - Sales & Marketing Manager - Lab Division"
      },
      {
        company: "MPM",
        code: "EK-SLSLAB-ASSMAN",
        rolename: "Ass. Sales & Marketing Manager - Lab Division",
        coderole: "EK-SLSLAB-ASSMAN - Ass. Sales & Marketing Manager - Lab Division"
      },
      {
        company: "MPM",
        code: "EK-SLSLAB-STAFF",
        rolename: "Sales & Marketing Staff - Lab Division",
        coderole: "EK-SLSLAB-STAFF - Sales & Marketing Staff - Lab Division"
      },
      {
        company: "MPM",
        code: "EK-SLSLAB-PS",
        rolename: "Product Specialist - Lab Division",
        coderole: "EK-SLSLAB-PS - Product Specialist - Lab Division"
      },
      {
        company: "MPM",
        code: "EK-SLSAES-MGR",
        rolename: "Sales & Marketing Manager - Aesthetic Division",
        coderole: "EK-SLSAES-MGR - Sales & Marketing Manager - Aesthetic Division"
      },
      {
        company: "MPM",
        code: "EK-SLSAES-STAFF",
        rolename: "Sales & Marketing Staff - Aesthetic Division",
        coderole: "EK-SLSAES-STAFF - Sales & Marketing Staff - Aesthetic Division"
      },
      {
        company: "MPM",
        code: "EK-FIN-MGR",
        rolename: "Finance Manager",
        coderole: "EK-FIN-MGR - Finance Manager"
      },
      {
        company: "MPM",
        code: "EK-SLSHOS-SPV",
        rolename: "Sales & Marketing Supervisor - Hospital Division",
        coderole: "EK-SLSHOS-SPV - Sales & Marketing Supervisor - Hospital Division"
      },
      {
        company: "MPM",
        code: "EK-WH-COOR",
        rolename: "Coordinator Warehouse ERKA",
        coderole: "EK-WH-COOR - Coordinator Warehouse ERKA"
      },
      {
        company: "MPM",
        code: "EK-SLSHOS-ASSMAN2",
        rolename: "Ass Sales & Marketing Manager - Hospital Division 2",
        coderole: "EK-SLSHOS-ASSMAN2 - Ass Sales & Marketing Manager - Hospital Division 2"
      },
      {
        company: "MPM",
        code: "EK-FIN-CASH",
        rolename: "Kasir ERKA",
        coderole: "EK-FIN-CASH - Kasir ERKA"
      },
      {
        company: "MPM",
        code: "EK-ADMSLS-STAFF2",
        rolename: "Staff Admin Sales & Marketing 2",
        coderole: "EK-ADMSLS-STAFF2 - Staff Admin Sales & Marketing 2"
      },
      {
        company: "MPM",
        code: "EK-SLSUN-STAFF2",
        rolename: "Sales & Marketing Staff - Unit Division 2",
        coderole: "EK-SLSUN-STAFF2 - Sales & Marketing Staff - Unit Division 2"
      },
      {
        company: "MPM",
        code: "EK-WHCBC-STAFF",
        rolename: "STAFF WH CBC",
        coderole: "EK-WHCBC-STAFF - STAFF WH CBC"
      },
      {
        company: "MPM",
        code: "MPM-FIN-MESS2",
        rolename: "Messenger 2",
        coderole: "MPM-FIN-MESS2 - Messenger 2"
      },
      {
        company: "MPM",
        code: "MPM-HRGALCOM-RECEPT2",
        rolename: "RECEPTIONIST 2",
        coderole: "MPM-HRGALCOM-RECEPT2 - RECEPTIONIST 2"
      },
      {
        company: "MPM",
        code: "MPM-IC-STAFF2",
        rolename: "Internal Control Staff 2",
        coderole: "MPM-IC-STAFF2 - Internal Control Staff 2"
      },
      {
        company: "MPM",
        code: "MPM-IC-STAFF3",
        rolename: "Internal Control Staff 3",
        coderole: "MPM-IC-STAFF3 - Internal Control Staff 3"
      },
      {
        company: "MPM",
        code: "MPM-SECRETARY",
        rolename: "Secretary",
        coderole: "MPM-SECRETARY - Secretary"
      },
      {
        company: "MPM",
        code: "MPM-MARCOM-DIGSTRS2",
        rolename: "Digital Strategic Staff 2",
        coderole: "MPM-MARCOM-DIGSTRS2 - Digital Strategic Staff 2"
      },
      {
        company: "MPM",
        code: "MPM-IT-STAFF2",
        rolename: "IT Staff 2",
        coderole: "MPM-IT-STAFF2 - IT Staff 2"
      },
      {
        company: "MPM",
        code: "MPM-HRGALCOM-COMSTF2",
        rolename: "Compliance Staff 2",
        coderole: "MPM-HRGALCOM-COMSTF2 - Compliance Staff 2"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-ADMSTAFF2",
        rolename: "Admin Warehouse Staff 2",
        coderole: "MPM-WHCIK-ADMSTAFF2 - Admin Warehouse Staff 2"
      },
      {
        company: "MPM",
        code: "MPM-FIN-MESS",
        rolename: "Messenger 1",
        coderole: "MPM-FIN-MESS - Messenger 1"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-TECHSTAFF2",
        rolename: "Technician Staff 2",
        coderole: "MPM-WHCIK-TECHSTAFF2 - Technician Staff 2"
      },
      {
        company: "MPM",
        code: "MPM-HRGALCOM-GASPV",
        rolename: "GA Supervisor",
        coderole: "MPM-HRGALCOM-GASPV - GA Supervisor"
      },
      {
        company: "MPM",
        code: "MPM-HRGALCOM-LGLSTA2",
        rolename: "Legal Staff 2",
        coderole: "MPM-HRGALCOM-LGLSTA2 - Legal Staff 2"
      },
      {
        company: "GLOBAL",
        code: "MPM-MARCOM-VIDEOGR1",
        rolename: "Videographer 1",
        coderole: "MPM-MARCOM-VIDEOGR1 - Videographer 1"
      },
      {
        company: "MPM",
        code: "AMPM-OB-OB",
        rolename: "OB",
        coderole: "AMPM-OB-OB - OB"
      },
      {
        company: "MPM",
        code: "MPM-WHCIK-ASSDRIV",
        rolename: "Assistant Driver 1",
        coderole: "MPM-WHCIK-ASSDRIV - Assistant Driver 1"
      },
      {
        company: "GLOBAL",
        code: "GLB-GM-GMAEST",
        rolename: "General Manager Aesthetic",
        coderole: "GLB-GM-GMAEST - General Manager Aesthetic"
      },
      {
        company: "GLOBAL",
        code: "GLB-GM-GMSC",
        rolename: "General Manager Skin Care",
        coderole: "GLB-GM-GMSC - General Manager Skin Care"
      },
      {
        company: "GLOBAL",
        code: "GLB-SLS-MGRAEST",
        rolename: "Sales Manager Aesthetic",
        coderole: "GLB-SLS-MGRAEST - Sales Manager Aesthetic"
      },
      {
        company: "GLOBAL",
        code: "GLB-SLS-MGRSC",
        rolename: "Sales Manager Skin Care",
        coderole: "GLB-SLS-MGRSC - Sales Manager Skin Care"
      },
      {
        company: "GLOBAL",
        code: "GLB-SLS-SLSAEST1",
        rolename: "Sales Aesthetic 1",
        coderole: "GLB-SLS-SLSAEST1 - Sales Aesthetic 1"
      },
      {
        company: "GLOBAL",
        code: "GLB-SLS-SLSAEST2",
        rolename: "Sales Aesthetic 2",
        coderole: "GLB-SLS-SLSAEST2 - Sales Aesthetic 2"
      },
      {
        company: "GLOBAL",
        code: "GLB-SLS-SLSSC1",
        rolename: "Sales Skin Care 1",
        coderole: "GLB-SLS-SLSSC1 - Sales Skin Care 1"
      },
      {
        company: "GLOBAL",
        code: "GLB-MRKTG-MGRSC",
        rolename: "Marketing Manager Skin Care",
        coderole: "GLB-MRKTG-MGRSC - Marketing Manager Skin Care"
      },
      {
        company: "GLOBAL",
        code: "GLB-MRKTG-MGRAEST",
        rolename: "Marketing Manager Aesthetic",
        coderole: "GLB-MRKTG-MGRAEST - Marketing Manager Aesthetic"
      },
      {
        company: "GLOBAL",
        code: "GLB-DSGN-MGR",
        rolename: "Manager Design",
        coderole: "GLB-DSGN-MGR - Manager Design"
      },
      {
        company: "GLOBAL",
        code: "GLB-DSGN-STAFF",
        rolename: "Staff Design",
        coderole: "GLB-DSGN-STAFF - Staff Design"
      },
      {
        company: "GLOBAL",
        code: "GLB-RND-MGR",
        rolename: "Manager Research and Development",
        coderole: "GLB-RND-MGR - Manager Research and Development"
      },
      {
        company: "GLOBAL",
        code: "GLB-RND-STAFF1",
        rolename: "Staff R&D 1",
        coderole: "GLB-RND-STAFF1 - Staff R&D 1"
      },
      {
        company: "GLOBAL",
        code: "GLB-RND-STAFF2",
        rolename: "Staff R&D 2",
        coderole: "GLB-RND-STAFF2 - Staff R&D 2"
      },
      {
        company: "GAE",
        code: "GAE-OP-MGR",
        rolename: "Operasional Manager",
        coderole: "GAE-OP-MGR - Operasional Manager"
      },
      {
        company: "GAE",
        code: "GAE-FIN-ADM",
        rolename: "Admin Finance",
        coderole: "GAE-FIN-ADM - Admin Finance"
      },
      {
        company: "GAE",
        code: "GAE-LOG-ADM",
        rolename: "Admin Logistik",
        coderole: "GAE-LOG-ADM - Admin Logistik"
      },
      {
        company: "GAE",
        code: "GAE-MKTG-SPV",
        rolename: "Supervisor Marketing",
        coderole: "GAE-MKTG-SPV - Supervisor Marketing"
      },
      {
        company: "GAE",
        code: "GAE-MKTG-ADM",
        rolename: "Admin Marketing",
        coderole: "GAE-MKTG-ADM - Admin Marketing"
      },
      {
        company: "GAE",
        code: "GAE-TECH-SPV 1",
        rolename: "Supervisor Teknisi 1",
        coderole: "GAE-TECH-SPV 1 - Supervisor Teknisi 1"
      },
      {
        company: "GAE",
        code: "GAE-TECH-SPV 2",
        rolename: "Supervisor Teknisi 2",
        coderole: "GAE-TECH-SPV 2 - Supervisor Teknisi 2"
      },
      {
        company: "GAE",
        code: "GAE-TECH-TECH1",
        rolename: "Teknisi 1",
        coderole: "GAE-TECH-TECH1 - Teknisi 1"
      },
      {
        company: "GAE",
        code: "GAE-TECH-TECH2",
        rolename: "Teknisi 2",
        coderole: "GAE-TECH-TECH2 - Teknisi 2"
      },
      {
        company: "GAE",
        code: "GAE-TECH-TECH3",
        rolename: "Teknisi 3",
        coderole: "GAE-TECH-TECH3 - Teknisi 3"
      },
      {
        company: "GAE",
        code: "GAE-TECH-TECH4",
        rolename: "Teknisi 4",
        coderole: "GAE-TECH-TECH4 - Teknisi 4"
      },
      {
        company: "GAE",
        code: "GAE-TECH-ADM1",
        rolename: "Admin Teknisi",
        coderole: "GAE-TECH-ADM1 - Admin Teknisi"
      },
      {
        company: "GAE",
        code: "GAE-SERV-ADM",
        rolename: "Admin Service",
        coderole: "GAE-SERV-ADM - Admin Service"
      },
      {
        company: "MPM",
        code: "AMPM-DIRUT",
        rolename: "Direktur Utama",
        coderole: "AMPM-DIRUT - Direktur Utama"
      },
      {
        company: "MPM",
        code: "AMPM-DIRSLSMKTG",
        rolename: "Direktur Sales & Marketing",
        coderole: "AMPM-DIRSLSMKTG - Direktur Sales & Marketing"
      },
      {
        company: "MPM",
        code: "AMPM-LOG-MGR",
        rolename: "Manager Logistik",
        coderole: "AMPM-LOG-MGR - Manager Logistik"
      },
      {
        company: "MPM",
        code: "AMPM-LOG-HOFWH",
        rolename: "Warehouse Manager",
        coderole: "AMPM-LOG-HOFWH - Warehouse Manager"
      },
      {
        company: "MPM",
        code: "AMPM-LOG-WHSPV",
        rolename: "Warehouse Supervisor",
        coderole: "AMPM-LOG-WHSPV - Warehouse Supervisor"
      },
      {
        company: "MPM",
        code: "AMPM-LOG-OP",
        rolename: "Operator",
        coderole: "AMPM-LOG-OP - Operator"
      },
      {
        company: "MPM",
        code: "AMPM-LOG-MESS",
        rolename: "Messenger",
        coderole: "AMPM-LOG-MESS - Messenger"
      },
      {
        company: "MPM",
        code: "AMPM-LOG-WHSTAFF",
        rolename: "Warehouse Staff",
        coderole: "AMPM-LOG-WHSTAFF - Warehouse Staff"
      },
      {
        company: "MPM",
        code: "AMPM-LOG-DRV",
        rolename: "Driver",
        coderole: "AMPM-LOG-DRV - Driver"
      },
      {
        company: "MPM",
        code: "AMPM-LOG-ADMWH",
        rolename: "Admin Warehouse",
        coderole: "AMPM-LOG-ADMWH - Admin Warehouse"
      },
      {
        company: "MPM",
        code: "AMPM-TA-TAXMGR",
        rolename: "Manager Tax",
        coderole: "AMPM-TA-TAXMGR - Manager Tax"
      },
      {
        company: "MPM",
        code: "AMPM-TA-ACCMGR",
        rolename: "Manager Accounting",
        coderole: "AMPM-TA-ACCMGR - Manager Accounting"
      },
      {
        company: "MPM",
        code: "AMPM-TA-TAXSPV",
        rolename: "Tax Supervisor",
        coderole: "AMPM-TA-TAXSPV - Tax Supervisor"
      },
      {
        company: "MPM",
        code: "AMPM-TA-TAXADM",
        rolename: "Tax Admin",
        coderole: "AMPM-TA-TAXADM - Tax Admin"
      },
      {
        company: "MPM",
        code: "AMPM-FIN-SPV",
        rolename: "Finance Supervisor",
        coderole: "AMPM-FIN-SPV - Finance Supervisor"
      },
      {
        company: "MPM",
        code: "AMPM-FIN-ADMPF",
        rolename: "Admin PF",
        coderole: "AMPM-FIN-ADMPF - Admin PF"
      },
      {
        company: "MPM",
        code: "AMPM-FIN-KAS",
        rolename: "Kasir",
        coderole: "AMPM-FIN-KAS - Kasir"
      },
      {
        company: "MPM",
        code: "AMPM-FIN-ADMAR",
        rolename: "Admin AR",
        coderole: "AMPM-FIN-ADMAR - Admin AR"
      },
      {
        company: "MPM",
        code: "AMPM-FIN-COLL",
        rolename: "Collector",
        coderole: "AMPM-FIN-COLL - Collector"
      },
      {
        company: "MPM",
        code: "AMPM-FIN-OP",
        rolename: "Operator",
        coderole: "AMPM-FIN-OP - Operator"
      },
      {
        company: "MPM",
        code: "AMPM-HRGAL-LSTAFF",
        rolename: "Legal Staff",
        coderole: "AMPM-HRGAL-LSTAFF - Legal Staff"
      },
      {
        company: "MPM",
        code: "AMPM-HRGAL-HRSTAFF",
        rolename: "HRD Staff",
        coderole: "AMPM-HRGAL-HRSTAFF - HRD Staff"
      },
      {
        company: "MPM",
        code: "AMPM-HRGAL-GASTAFF",
        rolename: "GA Staff",
        coderole: "AMPM-HRGAL-GASTAFF - GA Staff"
      },
      {
        company: "MPM",
        code: "AMPM-IT-ITSTAFF",
        rolename: "IT Staff",
        coderole: "AMPM-IT-ITSTAFF - IT Staff"
      },
      {
        company: "MPM",
        code: "AMPM-SLSMKTG-MGR",
        rolename: "Sales Manager",
        coderole: "AMPM-SLSMKTG-MGR - Sales Manager"
      },
      {
        company: "MPM",
        code: "AMPM-SLSMKTG-ASLSMGR1",
        rolename: "Area Sales Manager Jabar",
        coderole: "AMPM-SLSMKTG-ASLSMGR1 - Area Sales Manager Jabar"
      },
      {
        company: "MPM",
        code: "AMPM-SLSMKTG-NONMEDMGR",
        rolename: "Non Medis Sales Manager",
        coderole: "AMPM-SLSMKTG-NONMEDMGR - Non Medis Sales Manager"
      },
      {
        company: "MPM",
        code: "AMPM-SLSMKTG-SPV1",
        rolename: "Sales Supervisor 1",
        coderole: "AMPM-SLSMKTG-SPV1 - Sales Supervisor 1"
      },
      {
        company: "MPM",
        code: "AMPM-SLSMKTG-SPV2",
        rolename: "Sales Supervisor 2",
        coderole: "AMPM-SLSMKTG-SPV2 - Sales Supervisor 2"
      },
      {
        company: "MPM",
        code: "AMPM-SLSMKTG-SLSEX1",
        rolename: "Sales Executive 1",
        coderole: "AMPM-SLSMKTG-SLSEX1 - Sales Executive 1"
      },
      {
        company: "MPM",
        code: "AMPM-SLSMKTG-SLSEX2",
        rolename: "Sales Executive 2",
        coderole: "AMPM-SLSMKTG-SLSEX2 - Sales Executive 2"
      },
      {
        company: "MPM",
        code: "AMPM-SLSMKTG-SLSEX3",
        rolename: "Sales Executive 3",
        coderole: "AMPM-SLSMKTG-SLSEX3 - Sales Executive 3"
      },
      {
        company: "MPM",
        code: "AMPM-SLSMKTG-ADM",
        rolename: "Sales Admin",
        coderole: "AMPM-SLSMKTG-ADM - Sales Admin"
      },
      {
        company: "MPM",
        code: "AMPM-SLSMKTG-PROSPASSMAN",
        rolename: "Assistant Product Specialist Manager",
        coderole: "AMPM-SLSMKTG-PROSPASSMAN - Assistant Product Specialist Manager"
      },
      {
        company: "MPM",
        code: "AMPM-SLSMKTG-PROSP",
        rolename: "Staff Product Specialist",
        coderole: "AMPM-SLSMKTG-PROSP - Staff Product Specialist"
      },
      {
        company: "MPM",
        code: "AMPM-SLSMKTG-PROFSR",
        rolename: "Professional Sales Representative",
        coderole: "AMPM-SLSMKTG-PROFSR - Professional Sales Representative"
      },
      {
        company: "MPM",
        code: "AMPM-SLSMKTG-DATAL",
        rolename: "Data Analyst",
        coderole: "AMPM-SLSMKTG-DATAL - Data Analyst"
      },
      {
        company: "MPM",
        code: "AMPM-SERV-PJT",
        rolename: "PJT",
        coderole: "AMPM-SERV-PJT - PJT"
      },
      {
        company: "MPM",
        code: "AMPM-SERV-TECH",
        rolename: "Teknisi",
        coderole: "AMPM-SERV-TECH - Teknisi"
      },
      {
        company: "RMP",
        code: "POS",
        rolename: "position",
        coderole: "POS - position"
      },
      {
        company: "MPM",
        code: "MPM-HRGALCOM-LGLSTA3",
        rolename: "Legal Staff 3",
        coderole: "MPM-HRGALCOM-LGLSTA3 - Legal Staff 3"
      },
      {
        company: "RMP",
        code: "GLB-MARCOM-STAF",
        rolename: "Marketing Communication Staff",
        coderole: "GLB-MARCOM-STAF - Marketing Communication Staff"
      },
      {
        company: "MPM",
        code: "MPM-PM-ADM",
        rolename: "Product Marketing and Development Admin",
        coderole: "MPM-PM-ADM - Product Marketing and Development Admin"
      },
      {
        company: "MPM",
        code: "RMP-ADMSLS-STAFF4",
        rolename: "Sales & Online Admin Staff 4",
        coderole: "RMP-ADMSLS-STAFF4 - Sales & Online Admin Staff 4"
      },
      {
        company: "MPM",
        code: "AMPM-SLSMKT-APPUSG",
        rolename: "Applicant Specialist USG",
        coderole: "AMPM-SLSMKT-APPUSG - Applicant Specialist USG"
      },
      {
        company: "MPM",
        code: "AMPM-SLSMKT-COMSLSMG",
        rolename: "Commercial Sales Manager",
        coderole: "AMPM-SLSMKT-COMSLSMG - Commercial Sales Manager"
      },
      {
        company: "MPM",
        code: "AMPM-SOCMED",
        rolename: "Social Media Specialist",
        coderole: "AMPM-SOCMED - Social Media Specialist"
      },
      {
        company: "MPM",
        code: "GLB-ADM-ECOM",
        rolename: "ADMIN ECOM",
        coderole: "GLB-ADM-ECOM - ADMIN ECOM"
      },
      {
        company: 'RMP',
        code: 'SOFTWARE-ENGINER',
        rolename: 'Superadmin',
        coderole: 'SOFTWARE-ENGINER-Superadmin',
      },
    ]
    await Role.createMany(datarole)
  }
}
