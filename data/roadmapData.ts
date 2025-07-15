
import { Task } from '../types';

export const roadmapData: Task[] = [
  // Day 1: Foundations
  { day: 1, id: 'd1t1', title: 'Entender Fatos vs. Dimensões', topic: 'Modelagem', difficulty: 'Médio', link: 'https://aws.amazon.com/pt/redshift/what-is-a-star-schema/', xp: 20 },
  { day: 1, id: 'd1t2', title: 'O que é um Data Warehouse?', topic: 'Conceitos', difficulty: 'Fácil', link: 'https://www.oracle.com/br/database/what-is-a-data-warehouse/', xp: 10 },
  { day: 1, id: 'd1t3', title: 'O que é ETL vs. ELT?', topic: 'Conceitos', difficulty: 'Médio', link: 'https://www.alooma.com/blog/elt-vs-etl', xp: 20 },
  { day: 1, id: 'd1t4', title: 'Tipos de Dados: Estruturado, Semi-Estruturado, Não Estruturado', topic: 'Conceitos', difficulty: 'Fácil', link: 'https://www.mongodb.com/basics/structured-vs-unstructured-data', xp: 10 },
  // Day 2: SQL Basics
  { day: 2, id: 'd2t1', title: 'SELECT, FROM, WHERE', topic: 'SQL', difficulty: 'Fácil', link: 'https://www.w3schools.com/sql/sql_select.asp', xp: 10 },
  { day: 2, id: 'd2t2', title: 'JOINs (INNER, LEFT, RIGHT)', topic: 'SQL', difficulty: 'Médio', link: 'https://www.w3schools.com/sql/sql_join.asp', xp: 20 },
  { day: 2, id: 'd2t3', title: 'GROUP BY e HAVING', topic: 'SQL', difficulty: 'Médio', link: 'https://www.w3schools.com/sql/sql_groupby.asp', xp: 20 },
  { day: 2, id: 'd2t4', title: 'Funções de Agregação (COUNT, SUM, AVG)', topic: 'SQL', difficulty: 'Fácil', link: 'https://www.w3schools.com/sql/sql_count_avg_sum.asp', xp: 10 },
  // Day 3: Advanced SQL
  { day: 3, id: 'd3t1', title: 'Window Functions', topic: 'SQL Avançado', difficulty: 'Difícil', link: 'https://learnsql.com/blog/sql-window-functions-explained/', xp: 30 },
  { day: 3, id: 'd3t2', title: 'Common Table Expressions (CTEs)', topic: 'SQL Avançado', difficulty: 'Médio', link: 'https://www.sqlshack.com/sql-server-common-table-expressions-cte/', xp: 20 },
  { day: 3, id: 'd3t3', title: 'Subqueries', topic: 'SQL Avançado', difficulty: 'Médio', link: 'https://www.essentialsql.com/sql-subquery/', xp: 20 },
  // Day 4: Python for Data
  { day: 4, id: 'd4t1', title: 'Estruturas de Dados (Listas, Dicionários)', topic: 'Python', difficulty: 'Fácil', link: 'https://docs.python.org/3/tutorial/datastructures.html', xp: 10 },
  { day: 4, id: 'd4t2', title: 'Funções e Módulos', topic: 'Python', difficulty: 'Médio', link: 'https://docs.python.org/3/tutorial/modules.html', xp: 20 },
  { day: 4, id: 'd4t3', title: 'Manipulação de Arquivos (CSV, JSON)', topic: 'Python', difficulty: 'Médio', link: 'https://realpython.com/python-csv/', xp: 20 },
  // Day 5: Python Libraries
  { day: 5, id: 'd5t1', title: 'Introdução ao Pandas DataFrame', topic: 'Pandas', difficulty: 'Médio', link: 'https://pandas.pydata.org/docs/user_guide/dsintro.html#dataframe', xp: 20 },
  { day: 5, id: 'd5t2', title: 'Seleção e Filtro de Dados com Pandas', topic: 'Pandas', difficulty: 'Médio', link: 'https://pandas.pydata.org/docs/user_guide/indexing.html', xp: 20 },
  { day: 5, id: 'd5t3', title: 'Introdução ao NumPy Arrays', topic: 'NumPy', difficulty: 'Fácil', link: 'https://numpy.org/doc/stable/user/absolute_beginners.html', xp: 10 },
  // Day 6: ETL Concepts
  { day: 6, id: 'd6t1', title: 'Design de um Pipeline de ETL Simples', topic: 'ETL', difficulty: 'Difícil', link: 'https://www.talend.com/resources/what-is-etl-process/', xp: 30 },
  { day: 6, id: 'd6t2', title: 'Ferramentas de ETL/ELT (overview)', topic: 'ETL', difficulty: 'Médio', link: 'https://www.integrate.io/blog/best-etl-tools/', xp: 20 },
  // Day 7: Data Warehousing & Modeling
  { day: 7, id: 'd7t1', title: 'Star Schema vs. Snowflake Schema', topic: 'Modelagem', difficulty: 'Médio', link: 'https://www.guru99.com/star-snowflake-schema.html', xp: 20 },
  { day: 7, id: 'd7t2', title: 'Slowly Changing Dimensions (SCDs)', topic: 'Modelagem', difficulty: 'Difícil', link: 'https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/slowly-changing-dimension/', xp: 30 },
  // Day 8: Intro to Big Data
  { day: 8, id: 'd8t1', title: 'O que é o Ecossistema Hadoop?', topic: 'Big Data', difficulty: 'Médio', link: 'https://hadoop.apache.org/docs/current/hadoop-project-dist/hadoop-common/SingleCluster.html', xp: 20 },
  { day: 8, id: 'd8t2', title: 'Introdução ao Apache Spark', topic: 'Big Data', difficulty: 'Médio', link: 'https://spark.apache.org/docs/latest/api/python/getting_started/index.html', xp: 20 },
  // Day 9: Apache Spark Deep Dive
  { day: 9, id: 'd9t1', title: 'Spark RDDs vs. DataFrames', topic: 'Spark', difficulty: 'Médio', link: 'https://data-flair.training/blogs/spark-rdd-vs-dataframe-vs-dataset/', xp: 20 },
  { day: 9, id: 'd9t2', title: 'Transformações e Ações no Spark', topic: 'Spark', difficulty: 'Difícil', link: 'https://spark.apache.org/docs/latest/rdd-programming-guide.html#transformations', xp: 30 },
  // Day 10: Cloud Data Platforms
  { day: 10, id: 'd10t1', title: 'Visão Geral: AWS S3, Redshift, Glue', topic: 'Cloud', difficulty: 'Médio', link: 'https://aws.amazon.com/big-data/datalakes-and-analytics/', xp: 20 },
  { day: 10, id: 'd10t2', title: 'Visão Geral: GCP BigQuery, Cloud Storage', topic: 'Cloud', difficulty: 'Médio', link: 'https://cloud.google.com/bigquery/docs/introduction', xp: 20 },
  // Day 11: Data Orchestration
  { day: 11, id: 'd11t1', title: 'O que é Apache Airflow?', topic: 'Orquestração', difficulty: 'Médio', link: 'https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/overview.html', xp: 20 },
  { day: 11, id: 'd11t2', title: 'DAGs no Airflow: O que são?', topic: 'Orquestração', difficulty: 'Difícil', link: 'https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dags.html', xp: 30 },
  // Day 12: Streaming Data
  { day: 12, id: 'd12t1', title: 'Introdução ao Apache Kafka', topic: 'Streaming', difficulty: 'Difícil', link: 'https://kafka.apache.org/intro', xp: 30 },
  { day: 12, id: 'd12t2', title: 'Produtores e Consumidores Kafka', topic: 'Streaming', difficulty: 'Médio', link: 'https://developer.confluent.io/learn/kafka-producers-and-consumers/', xp: 20 },
  // Day 13: Data Visualization
  { day: 13, id: 'd13t1', title: 'Princípios de Visualização de Dados', topic: 'Visualização', difficulty: 'Médio', link: 'https://material.io/design/communication/data-visualization.html', xp: 20 },
  { day: 13, id: 'd13t2', title: 'Conhecendo Tableau e Power BI', topic: 'Visualização', difficulty: 'Fácil', link: 'https://www.tableau.com/learn/articles/power-bi-vs-tableau', xp: 10 },
  // Day 14: Data Ops & Governance
  { day: 14, id: 'd14t1', title: 'O que é DataOps?', topic: 'DataOps', difficulty: 'Médio', link: 'https://www.dataops.academy/courses/dataops-fundamentals', xp: 20 },
  { day: 14, id: 'd14t2', title: 'O que é Governança de Dados?', topic: 'Governança', difficulty: 'Difícil', link: 'https://www.ibm.com/br-pt/topics/data-governance', xp: 30 }
];
