INSERT INTO department(name)
    VALUES  ("Engineer"),
            ("Specialist"),
            ("Data"),
            ("Security");

INSERT INTO roles(title, salary, department_id)
    VALUES  ("Quality Engineer", 100000, 1),
            ("Material Handler Specialist", 85000, 1),
            ("Data Technician", 95000, 2),
            ("Could Engineer", 110000, 2),
            ("Market Specialist", 75000, 3);
            ("Senior Software Engineer", 160000, 3);
            ("Security Analyst", 130000 , 4)
            ("Cloud Engineer", 100000, 4 )


INSERT INTO employee(first_name, last_name, role_id, manager_id)

    VALUES  ("Aldo", "Valencia", 1, NULL)
            ("James", "Brown", 1, NULL),
            ("Stevie", "Wonder", 2, 1),
            ("Aretha", "Franklin", 2, 1),
            ("Michael", "Jackson", 3, NULL),
            ("Run", "DMC", 4, NULL),
            ("Frank", "Ocean", 5, 5),
            ("Amy", "Winehouse", 5, 5),
            ("Busta", "Rhymes", 6, NULL),
            ("Alicia", "Keys", 7, 8),
            ("Mary J.", "Blige", 7, 8);