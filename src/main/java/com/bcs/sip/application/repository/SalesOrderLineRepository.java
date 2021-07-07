package com.bcs.sip.application.repository;

import com.bcs.sip.application.domain.SalesOrderLine;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SalesOrderLine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SalesOrderLineRepository extends JpaRepository<SalesOrderLine, Long> {

}
