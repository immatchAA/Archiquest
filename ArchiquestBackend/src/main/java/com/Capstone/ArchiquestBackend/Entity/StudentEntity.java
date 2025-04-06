package com.Capstone.ArchiquestBackend.Entity;


import jakarta.persistence.*;

@Entity
@Table(name = "tblStudent")
public class StudentEntity {

    @Id
    @Column(name = "studentID", length = 45)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int studentID;

    @Column(name = "firstName", length = 255)
    public String firstName;

    @Column(name = "lastName", length = 255)
    public String lastName;

    @Column(name = "email", length = 255)
    private String email;

    @Column(name = "password", length = 255)
    private String password;

    public StudentEntity(int studentID, String firstName, String lastName, String email, String password) {
        this.studentID = studentID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public StudentEntity() {
    }

    public int getStudentID() {
        return studentID;
    }

    public void setStudentID(int studentID) {
        this.studentID = studentID;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "StudentEntity{" +
                "studentID=" + studentID +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
