/**
 * ALL site content lives here. Edit text without touching components.
 * Empty string URLs render as disabled "coming soon" buttons.
 */

export const nav = [
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "lab-bench", label: "Lab Bench" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export const hero = {
  prompt: "$ whoami",
  name: "Nothando Gama",
  subtitle: "Bioinformatician · Computational Biology · Machine Learning for Omics",
  sentence:
    "MSc Computational Health Informatics candidate at the University of Cape Town, using graph neural networks to uncover regulatory interactions in breast cancer.",
  status: "Currently: writing up my MSc dissertation · open to opportunities",
};

export const links = {
  email: "nothandograce82@gmail.com",
  github: "",
  linkedin: "",
};

export const about = {
  paragraphs: [
    "I am a trained bioinformatician focused on using computational methods to solve biological problems. I work across Python, R and Bash to process, analyse and interpret large biological datasets, and I have been trained across multi-omics data: genomics, proteomics, transcriptomics, imaging omics and metabolomics.",
    "My experience spans genomic data processing, HPC-based analysis and building bioinformatics pipelines, including NGS read alignment and variant calling. I keep expanding my technical knowledge beyond formal coursework, and I am interested in applying these skills to omics research that integrates machine learning.",
  ],
  tools: [
    "Python",
    "R",
    "Bash",
    "PyTorch",
    "PyTorch Geometric",
    "scikit-learn",
    "pandas",
    "Bioconductor",
    "BWA",
    "SAMtools",
    "FastQC",
    "Trimmomatic",
    "IGV",
    "Git",
    "Conda",
    "SLURM",
  ],
};

export const research = {
  label: "MSc Dissertation · University of Cape Town · 2025–2026",
  title:
    "Heterogeneous Graph Transformer Framework for miRNA–mRNA Regulatory Interaction Prediction in Breast Cancer",
  columns: [
    {
      heading: "Question",
      icon: "FlaskConical",
      body: "Can we predict previously uncharacterised miRNA–mRNA regulatory interactions in breast cancer that could serve as biomarkers?",
    },
    {
      heading: "Approach",
      icon: "Network",
      body: "Integrate molecular expression data with experimentally supported interactions from public genomic databases, and train graph neural network models (heterogeneous graph transformer) on the resulting miRNA–mRNA network.",
    },
    {
      heading: "Evaluation",
      icon: "Sigma",
      body: "AUROC, AUPRC, accuracy, precision, recall and F1, from data acquisition through to biological interpretation.",
    },
  ],
  tags: [
    "GNN",
    "HGT",
    "PyTorch Geometric",
    "Transcriptomics",
    "Cancer Genomics",
    "Biomarkers",
    "HPC",
  ],
  badge: "Presented at SASBI 2026",
};

export const experience = [
  {
    role: "MSc Researcher, Computational Health Informatics",
    org: "University of Cape Town",
    period: "2025–2026",
    location: "Cape Town",
    bullets: [
      "Process and integrate large transcriptomic and genomic datasets from public genomic databases, building and adapting an end-to-end pipeline in Python, R and Bash for cleaning, filtering, transformation and quality control.",
      "Work with large genomic datasets on UCT's HPC infrastructure when computational demands exceed a local machine.",
      "Integrate molecular expression data with experimentally supported biological interactions to build graph neural network models that predict previously uncharacterised miRNA–mRNA interactions in breast cancer.",
      "Evaluate models using AUROC, AUPRC, accuracy, precision, recall and F1 score.",
    ],
  },
  {
    role: "Data Management Intern, Genomics Platform",
    org: "South African Medical Research Council (SAMRC)",
    period: "Sep–Nov 2025",
    location: "",
    bullets: [
      "Worked with genomic data from multiple species within an established bioinformatics workflow, using Bash and Linux-based HPC infrastructure.",
      "Focused on data accuracy, integrity and quality control at each stage of a multi-step pipeline before delivery to research clients.",
      "Carried out genome assembly from Oxford Nanopore (ONT) long-read sequencing data as part of the established workflow.",
    ],
  },
];

export const projects = [
  {
    title: "NGS Variant Calling Pipeline",
    meta: "MSc coursework · 2025",
    visual: "pipeline" as const,
    pipeline: ["FastQC", "Trimmomatic", "BWA", "SAMtools", "IGV"],
    description:
      "Scripted a full NGS read-to-variant pipeline in Bash and Python: quality assessment, read trimming, alignment, and alignment/variant processing, with reads and called variants inspected in IGV to validate each stage.",
    tags: ["Bash", "Python", "BWA", "SAMtools", "IGV"],
    repoUrl: "",
  },
  {
    title: "Breast Cancer Subtype Classification",
    meta: "MSc coursework",
    visual: "heatmap" as const,
    description:
      "Processed high-dimensional genomic expression data in Python and R, from cleaning and feature selection through to modelling. Built, tuned and evaluated classification models for breast cancer subtype prediction, comparing accuracy, precision, recall and F1.",
    tags: ["Python", "R", "scikit-learn", "Feature selection"],
    repoUrl: "",
  },
];

export const skills = {
  groups: [
    {
      heading: "Programming & Tools",
      icon: "Terminal",
      items: [
        "Python",
        "R",
        "Bash",
        "SQL (basics)",
        "Git",
        "Conda",
        "Linux",
        "VS Code",
        "HPC / SLURM",
      ],
    },
    {
      heading: "Python & R Libraries",
      icon: "Sigma",
      items: [
        "PyTorch",
        "PyTorch Geometric",
        "scikit-learn",
        "pandas",
        "NumPy",
        "SciPy",
        "Matplotlib",
        "Seaborn",
        "tidyverse",
        "dplyr",
        "tidyr",
        "readr",
        "ggplot2",
        "Bioconductor",
        "biomaRt",
      ],
    },
    {
      heading: "Machine Learning",
      icon: "BrainCircuit",
      items: [
        "GCN",
        "GraphSAGE",
        "GAT",
        "RGCN",
        "HAN",
        "HGT",
        "Logistic regression",
        "Random forest",
        "XGBoost",
        "LightGBM",
        "SVM",
        "Feature engineering",
        "Hyperparameter tuning",
        "Model evaluation",
      ],
    },
    {
      heading: "Bioinformatics",
      icon: "Dna",
      items: [
        "Genomics",
        "Transcriptomics",
        "RNA-seq",
        "NGS QC & trimming",
        "Read alignment",
        "Variant calling",
        "Genome assembly (ONT long-read)",
        "miRNA/mRNA analysis",
        "Population genomics",
        "Association studies",
        "Computational phylogenetics",
        "Pipeline development",
        "FastQC",
        "Trimmomatic",
        "BWA",
        "SAMtools",
        "IGV",
      ],
    },
  ],
  hpcNote:
    "Running and troubleshooting large-scale model training on ilifu and UCT HPC (SLURM).",
};

export const labBench = {
  title: "Lab Bench — DNA → RNA → Protein",
  placeholder: "Paste a DNA sequence, e.g. ATGGCCATTGTAATGGGCCGCTGA",
  caption: "Translation begins at the first AUG and stops at the first stop codon.",
  examples: [
    { label: "Insulin fragment", seq: "ATGGCCCTGTGGATGCGCCTCCTGCCCCTGCTGGCGCTGCTGGCCCTCTGGGGACCTGA" },
    { label: "Start-to-stop demo", seq: "ATGGCCATTGTAATGGGCCGCTGA" },
  ],
};

export const education = [
  {
    school: "University of Cape Town",
    degree: "MSc Computational Health Informatics",
    period: "2025–2026 (expected mid-to-late 2026)",
    note: "Current GPA 81.92%",
  },
  {
    school: "University of Limpopo",
    degree: "BSc Honours Microbiology",
    period: "2023",
    note: "Average 74%",
  },
  {
    school: "University of Limpopo",
    degree: "BSc Life Sciences",
    period: "2019–2022",
    note: "Final-year average 77%",
  },
];

export const coursework = {
  title: "Selected MSc coursework (%)",
  bars: [
    { label: "Population Genomics", value: 92 },
    { label: "OMICS Data Generation", value: 88 },
    { label: "Bio-programming with Python", value: 87 },
    { label: "Computational Phylogenetics", value: 86 },
    { label: "Bio-computing", value: 84 },
    { label: "Association Studies", value: 79 },
  ],
};

export const conferences = [
  {
    title: "SASBI 2026",
    body: "Presented dissertation research on HGT-based discovery of miRNA–mRNA regulatory interactions as biomarkers for breast cancer.",
  },
  {
    title: "Big Data Africa School 2026, Cape Town",
    body: "Accepted participant. Focus: AI/ML for prognostic biomarkers in idiopathic pulmonary fibrosis (IPF) using medical imaging.",
  },
];

export const contact = {
  heading: "Let's connect",
  line: "Open to bioinformatics and computational biology roles.",
  location: "Cape Town, South Africa",
  phoneMasked: "081 873 ••••",
  phoneNote: "full number on request",
  footer: "© 2026 Nothando Gama",
  footerNote: "Built with curiosity and a lot of pipelines.",
};
