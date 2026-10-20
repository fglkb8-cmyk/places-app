package com.example.places.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/** places テーブル */
@Entity
@Table(name = "places")
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_id")
    @JsonProperty("place_id")
    private Long placeId;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "area", nullable = false, length = 50)
    private String area;

    @Column(name = "category", nullable = false, length = 50)
    private String category;

    @Column(name = "memo", length = 200)
    private String memo;

    public Long getPlaceId() { return placeId; }
    public void setPlaceId(Long placeId) { this.placeId = placeId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getMemo() { return memo; }
    public void setMemo(String memo) { this.memo = memo; }
}
