package com.bcs.sip.application.repository;

import com.bcs.sip.application.domain.PurchaseOrderLine;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PurchaseOrderLine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PurchaseOrderLineRepository extends JpaRepository<PurchaseOrderLine, Long> {

}
